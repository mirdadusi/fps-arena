import { Config } from '../Config.js';

/**
 * WebSocket client with authenticated session resume and bounded backoff.
 * A transient network loss keeps the current match alive instead of leaving a
 * permanently frozen client.
 */
export class NetworkManager {
  #ws = null;
  #handlers = new Map();
  #playerId = null;
  #sessionToken = null;
  #url = null;
  #manualClose = false;
  #reconnectTimer = 0;
  #reconnectAttempt = 0;
  #generation = 0;
  #WebSocketImpl;
  #reconnectDelays;

  constructor({ WebSocketImpl = globalThis.WebSocket, reconnectDelays = Config.network.reconnectDelays } = {}) {
    this.#WebSocketImpl = WebSocketImpl;
    this.#reconnectDelays = reconnectDelays;
  }

  get connected() { return this.#ws?.readyState === this.#WebSocketImpl.OPEN; }
  get playerId() { return this.#playerId; }

  connect(url) {
    this.#url = url;
    this.#manualClose = false;
    this.#clearReconnectTimer();
    return this.#open(false);
  }

  #open(isReconnect) {
    return new Promise((resolve, reject) => {
      const generation = ++this.#generation;
      const ws = new this.#WebSocketImpl(this.#url);
      this.#ws = ws;
      let settled = false;
      let replacementPlayerId = null;
      let replacementToken = null;

      ws.onopen = () => {
        if (generation !== this.#generation) return;
        if (!isReconnect) {
          settled = true;
          resolve();
        }
      };

      ws.onerror = () => {
        if (!isReconnect && !settled) {
          settled = true;
          reject(new Error('WebSocket connection failed'));
        }
      };

      ws.onclose = (event) => {
        if (generation !== this.#generation) return;
        this.#ws = null;
        if (!isReconnect && !settled) {
          settled = true;
          reject(new Error('WebSocket connection closed before it was ready'));
        } else if (isReconnect && !settled) {
          settled = true;
          reject(new Error('Reconnect attempt failed'));
        }
        if (this.#manualClose) return;
        this.#emit('disconnected', {
          attempt: this.#reconnectAttempt + 1,
          code: event?.code,
          reason: event?.reason,
        });
        this.#scheduleReconnect();
      };

      ws.onmessage = (event) => {
        let msg;
        try { msg = JSON.parse(event.data); } catch { return; }
        if (!msg || typeof msg.type !== 'string') return;

        if (msg.type === 'WELCOME') {
          replacementPlayerId = msg.playerId;
          replacementToken = msg.sessionToken;
          if (isReconnect && this.#sessionToken) {
            this.#sendRaw(ws, 'RESUME_SESSION', { sessionToken: this.#sessionToken });
          } else {
            this.#playerId = replacementPlayerId;
            this.#sessionToken = replacementToken;
            if (isReconnect) {
              this.#finishReconnect(msg);
              if (!settled) { settled = true; resolve(); }
            }
          }
        } else if (msg.type === 'SESSION_RESUMED') {
          this.#playerId = msg.playerId;
          this.#sessionToken = msg.sessionToken;
          this.#finishReconnect(msg);
          if (!settled) { settled = true; resolve(); }
        } else if (msg.type === 'RESUME_FAILED') {
          // Keep the fresh connection useful for the lobby, but the old match
          // cannot be recovered because its grace period elapsed.
          this.#playerId = replacementPlayerId;
          this.#sessionToken = replacementToken;
          this.#reconnectAttempt = 0;
          this.#emit('reconnect_failed', msg);
          if (!settled) { settled = true; resolve(); }
        }

        this.#emit(msg.type, msg);
      };
    });
  }

  #finishReconnect(data) {
    this.#reconnectAttempt = 0;
    this.#emit('reconnected', data);
  }

  #scheduleReconnect() {
    if (this.#manualClose || !this.#url || this.#reconnectTimer) return;
    const index = Math.min(this.#reconnectAttempt, this.#reconnectDelays.length - 1);
    const delay = this.#reconnectDelays[index];
    this.#reconnectAttempt++;
    this.#emit('reconnecting', { attempt: this.#reconnectAttempt, delay });
    this.#reconnectTimer = setTimeout(() => {
      this.#reconnectTimer = 0;
      this.#open(true).catch(() => { /* close/error schedules the next try */ });
    }, delay);
  }

  #clearReconnectTimer() {
    if (this.#reconnectTimer) clearTimeout(this.#reconnectTimer);
    this.#reconnectTimer = 0;
  }

  disconnect() {
    this.#manualClose = true;
    this.#clearReconnectTimer();
    this.#generation++;
    const ws = this.#ws;
    this.#ws = null;
    ws?.close();
    this.#playerId = null;
    this.#sessionToken = null;
    this.#reconnectAttempt = 0;
  }

  destroy() {
    this.disconnect();
    this.#handlers.clear();
  }

  on(type, handler) {
    if (!this.#handlers.has(type)) this.#handlers.set(type, new Set());
    this.#handlers.get(type).add(handler);
    return () => this.#handlers.get(type)?.delete(handler);
  }

  #emit(type, data) {
    this.#handlers.get(type)?.forEach(handler => handler(data));
  }

  #sendRaw(ws, type, data = {}) {
    if (ws?.readyState !== this.#WebSocketImpl.OPEN) return false;
    ws.send(JSON.stringify({ type, ...data }));
    return true;
  }

  #send(type, data = {}) {
    return this.#sendRaw(this.#ws, type, data);
  }

  createRoom(name, arena, maxPlayers, botCount, playerName, gameMode, team, skinIndex) {
    this.#send('CREATE_ROOM', { name, arena, maxPlayers, botCount, playerName, gameMode, team, skinIndex });
  }
  joinRoom(roomId, playerName, team, skinIndex) {
    this.#send('JOIN_ROOM', { roomId, playerName, team, skinIndex });
  }
  listRooms() { this.#send('LIST_ROOMS'); }
  startGame() { this.#send('START_GAME'); }
  leaveRoom() { this.#send('LEAVE_ROOM'); }

  sendPlayerState(position, rotation) {
    this.#send('PLAYER_STATE', {
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { y: rotation.y, x: rotation.x },
    });
  }

  sendShoot(origin, direction) {
    this.#send('SHOOT', {
      origin: { x: origin.x, y: origin.y, z: origin.z },
      direction: { x: direction.x, y: direction.y, z: direction.z },
    });
  }

  sendPickupCollected(pickupId) { this.#send('PICKUP_COLLECTED', { pickupId }); }
  sendPlayerHit(targetId, damage) { this.#send('PLAYER_HIT', { targetId, damage }); }
  sendPlayerKilled(targetId) { this.#send('PLAYER_KILLED', { targetId }); }
  sendPlayerRespawn(position) {
    this.#send('PLAYER_RESPAWN', {
      position: { x: position.x, y: position.y, z: position.z },
    });
  }
  sendChat(text) { this.#send('CHAT_MESSAGE', { text: String(text).slice(0, 200) }); }
  sendWeaponSwitch(weaponIndex) { this.#send('WEAPON_SWITCH', { weaponIndex }); }
  sendGrenadeThrow(origin, direction) {
    this.#send('GRENADE_THROW', {
      origin: { x: origin.x, y: origin.y, z: origin.z },
      direction: { x: direction.x, y: direction.y, z: direction.z },
    });
  }
}
