/**
 * NetworkManager — WebSocket client for multiplayer communication.
 */
export class NetworkManager {
  #ws = null;
  #handlers = new Map();
  #playerId = null;

  get connected() { return this.#ws?.readyState === 1; }
  get playerId() { return this.#playerId; }

  connect(url) {
    return new Promise((resolve, reject) => {
      this.#ws = new WebSocket(url);
      this.#ws.onopen = () => resolve();
      this.#ws.onerror = () => reject(new Error('WebSocket connection failed'));
      this.#ws.onclose = () => this.#emit('disconnected');
      this.#ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === 'WELCOME') this.#playerId = msg.playerId;
          this.#emit(msg.type, msg);
        } catch { /* ignore malformed */ }
      };
    });
  }

  disconnect() {
    this.#ws?.close();
    this.#ws = null;
  }

  on(type, handler) {
    if (!this.#handlers.has(type)) this.#handlers.set(type, new Set());
    this.#handlers.get(type).add(handler);
    return () => this.#handlers.get(type)?.delete(handler);
  }

  #emit(type, data) {
    this.#handlers.get(type)?.forEach(h => h(data));
  }

  #send(type, data = {}) {
    if (!this.connected) return;
    this.#ws.send(JSON.stringify({ type, ...data }));
  }

  // ── High-level API ──
  createRoom(name, arena, maxPlayers, botCount, playerName, gameMode, team, skinIndex) {
    this.#send('CREATE_ROOM', { name, arena, maxPlayers, botCount, playerName, gameMode, team, skinIndex });
  }
  joinRoom(roomId, playerName, team, skinIndex) {
    this.#send('JOIN_ROOM', { roomId, playerName, team, skinIndex });
  }
  listRooms()    { this.#send('LIST_ROOMS'); }
  startGame()    { this.#send('START_GAME'); }
  leaveRoom()    { this.#send('LEAVE_ROOM'); }

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

  // New message types
  sendChat(text) { this.#send('CHAT_MESSAGE', { text: String(text).slice(0, 200) }); }
  sendWeaponSwitch(weaponIndex) { this.#send('WEAPON_SWITCH', { weaponIndex }); }
  sendGrenadeThrow(origin, direction) {
    this.#send('GRENADE_THROW', {
      origin: { x: origin.x, y: origin.y, z: origin.z },
      direction: { x: direction.x, y: direction.y, z: direction.z },
    });
  }
}
