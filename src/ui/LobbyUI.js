import { ARENA_LAYOUTS } from '../world/ArenaLayouts.js';
import { Config } from '../Config.js';
import { PersistenceStore } from '../stores/PersistenceStore.js';

/**
 * LobbyUI — full-screen lobby for single-player config, room creation, and room joining.
 * Now includes skin selection, game mode, and team selection.
 */
export class LobbyUI {
  #el;
  #startCallback = null;
  #selectedRoomId = null;
  #selectedRoomMode = 'ffa';
  #network = null;
  #skinIndices = { sp: 0, cr: 0, jr: 0 };

  constructor() {
    this.#el = document.getElementById('lobby');
    this.#bindTabs();
    this.#populateArenaSelectors();
    this.#populateSkinSelectors();
    this.#bindControls();
    this.#bindGameModeToggle();
    this.#autofill();
    this.#buildSettingsPanel();
  }

  show() { this.#el.style.display = 'flex'; }
  hide() { this.#el.style.display = 'none'; }
  onStart(cb) { this.#startCallback = cb; }

  #bindTabs() {
    document.querySelectorAll('.lobby-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.lobby-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.lobby-panel').forEach(p => p.classList.add('hidden'));
        const panel = document.getElementById(`panel-${tab.dataset.tab}`);
        if (panel) panel.classList.remove('hidden');
      });
    });
  }

  #populateArenaSelectors() {
    for (const containerId of ['sp-arena', 'cr-arena']) {
      const container = document.getElementById(containerId);
      if (!container) continue;
      container.innerHTML = '';
      for (const [key, layout] of Object.entries(ARENA_LAYOUTS)) {
        const card = document.createElement('div');
        card.className = 'arena-card' + (key === 'classic' ? ' selected' : '');
        card.dataset.arena = key;
        card.innerHTML = `<div class="arena-preview">${layout.preview}</div><div class="arena-name">${layout.name}</div><div class="arena-desc">${layout.description}</div>`;
        card.addEventListener('click', () => {
          container.querySelectorAll('.arena-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        });
        container.appendChild(card);
      }
    }
  }

  #populateSkinSelectors() {
    for (const prefix of ['sp', 'cr', 'jr']) {
      const container = document.getElementById(`${prefix}-skin`);
      if (!container) continue;
      container.innerHTML = '';
      Config.skins.forEach((skin, idx) => {
        const swatch = document.createElement('div');
        swatch.className = 'skin-swatch' + (idx === 0 ? ' selected' : '');
        swatch.style.background = '#' + skin.primary.toString(16).padStart(6, '0');
        swatch.title = skin.name;
        swatch.addEventListener('click', () => {
          container.querySelectorAll('.skin-swatch').forEach(s => s.classList.remove('selected'));
          swatch.classList.add('selected');
          this.#skinIndices[prefix] = idx;
        });
        container.appendChild(swatch);
      });
    }
  }

  #bindGameModeToggle() {
    const modeSelect = document.getElementById('cr-game-mode');
    const teamField = document.getElementById('cr-team-field');
    if (modeSelect && teamField) {
      modeSelect.addEventListener('change', () => {
        teamField.style.display = modeSelect.value !== 'ffa' ? 'block' : 'none';
      });
    }
  }

  #bindControls() {
    const wire = (sliderId, displayId) => {
      const s = document.getElementById(sliderId);
      const d = document.getElementById(displayId);
      if (s && d) s.addEventListener('input', () => { d.textContent = s.value; });
    };
    wire('sp-bots', 'sp-bot-count');
    wire('cr-bots', 'cr-bot-count');
    wire('cr-max-players', 'cr-max-count');

    document.getElementById('btn-start-single')?.addEventListener('click', () => {
      const arena = document.querySelector('#sp-arena .arena-card.selected')?.dataset.arena || 'classic';
      const botCount = parseInt(document.getElementById('sp-bots')?.value || '1');
      const name = document.getElementById('sp-name')?.value?.trim() || 'Player';
      PersistenceStore.setPlayerName(name);
      PersistenceStore.setSkinIndex(this.#skinIndices.sp);
      this.#startCallback?.({
        mode: 'single', arena, botCount, playerName: name,
        skinIndex: this.#skinIndices.sp,
      });
    });

    document.getElementById('btn-create-room')?.addEventListener('click', () => this.#handleCreateRoom());
    document.getElementById('btn-refresh-rooms')?.addEventListener('click', () => this.#refreshRooms());
    document.getElementById('btn-join-room')?.addEventListener('click', () => {
      if (this.#selectedRoomId && this.#network?.connected) {
        const name = document.getElementById('jr-name')?.value?.trim() || 'Player';
        const team = document.getElementById('jr-team')?.value || 'red';
        this.#network.joinRoom(this.#selectedRoomId, name, team, this.#skinIndices.jr);
      }
    });
    document.getElementById('btn-start-room')?.addEventListener('click', () => this.#network?.startGame());
    document.getElementById('btn-leave-room')?.addEventListener('click', () => {
      this.#network?.leaveRoom();
      this.#showPanel('create');
    });
  }

  async #ensureConnected() {
    if (this.#network?.connected) return true;
    const { NetworkManager } = await import('../net/NetworkManager.js');
    this.#network = new NetworkManager();
    try {
      // Same origin, no explicit port: behind TLS the old `:3000` had no
      // certificate and the connection simply failed. A reverse proxy maps
      // /ws to the game server; in dev, `npm start` serves both from one port.
      const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
      await this.#network.connect(`${proto}//${location.host}/ws`);
      this.#bindNetworkEvents();
      return true;
    } catch {
      alert('Cannot connect to server. Run: npm start');
      return false;
    }
  }

  async #handleCreateRoom() {
    if (!(await this.#ensureConnected())) return;
    const arena = document.querySelector('#cr-arena .arena-card.selected')?.dataset.arena || 'classic';
    const roomName = document.getElementById('cr-room-name')?.value?.trim() || 'My Arena';
    const maxPlayers = parseInt(document.getElementById('cr-max-players')?.value || '4');
    const botCount = parseInt(document.getElementById('cr-bots')?.value || '2');
    const name = document.getElementById('cr-name')?.value?.trim() || 'Player';
    const gameMode = document.getElementById('cr-game-mode')?.value || 'ffa';
    const team = gameMode !== 'ffa' ? (document.getElementById('cr-team')?.value || 'red') : null;
    this.#network.createRoom(roomName, arena, maxPlayers, botCount, name, gameMode, team, this.#skinIndices.cr);
  }

  async #refreshRooms() {
    if (!(await this.#ensureConnected())) return;
    this.#network.listRooms();
  }

  #bindNetworkEvents() {
    if (!this.#network) return;
    this.#network.on('ROOM_LIST', msg => this.#renderRoomList(msg.rooms));
    this.#network.on('ROOM_CREATED', msg => {
      this.#showPanel('waiting');
      document.getElementById('waiting-room-name').textContent = msg.roomName;
      document.getElementById('btn-start-room').style.display = 'block';
      this.#updateWaitingPlayers(msg.players);
    });
    this.#network.on('JOINED', msg => {
      this.#showPanel('waiting');
      document.getElementById('waiting-room-name').textContent = msg.roomName;
      document.getElementById('btn-start-room').style.display = msg.isHost ? 'block' : 'none';
      this.#updateWaitingPlayers(msg.players);
    });
    this.#network.on('PLAYER_JOINED', msg => this.#updateWaitingPlayers(msg.players));
    this.#network.on('PLAYER_LEFT', msg => this.#updateWaitingPlayers(msg.players));
    this.#network.on('GAME_STARTED', msg => {
      this.#startCallback?.({
        mode: 'multi',
        arena: msg.arena,
        botCount: msg.botCount,
        playerName: msg.playerName || this.#getMultiName(),
        network: this.#network,
        players: msg.players,
        playerId: this.#network.playerId,
        gameMode: msg.gameMode || 'ffa',
        team: msg.team || null,
        skinIndex: this.#skinIndices.cr || this.#skinIndices.jr || 0,
      });
    });
  }

  #getMultiName() {
    return document.getElementById('cr-name')?.value?.trim()
      || document.getElementById('jr-name')?.value?.trim()
      || 'Player';
  }

  #showPanel(name) {
    document.querySelectorAll('.lobby-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(`panel-${name}`)?.classList.remove('hidden');
  }

  #renderRoomList(rooms) {
    const list = document.getElementById('room-list');
    const btn = document.getElementById('btn-join-room');
    const teamField = document.getElementById('jr-team-field');
    if (!rooms?.length) {
      list.innerHTML = '<div class="room-empty">No rooms available</div>';
      btn.disabled = true;
      return;
    }
    list.innerHTML = '';
    this.#selectedRoomId = null;
    rooms.forEach(room => {
      const el = document.createElement('div');
      el.className = 'room-item';
      const modeLabel = room.gameMode === 'tdm' ? 'TDM' : room.gameMode === 'ctf' ? 'CTF' : 'FFA';
      el.innerHTML = `<div class="room-name-text">${this.#esc(room.name)}</div><div class="room-info">${room.arena} · ${modeLabel} · ${room.playerCount}/${room.maxPlayers}</div>`;
      el.addEventListener('click', () => {
        list.querySelectorAll('.room-item').forEach(r => r.classList.remove('selected'));
        el.classList.add('selected');
        this.#selectedRoomId = room.id;
        this.#selectedRoomMode = room.gameMode || 'ffa';
        btn.disabled = false;
        // Show team select for team modes
        if (teamField) {
          teamField.style.display = this.#selectedRoomMode !== 'ffa' ? 'block' : 'none';
        }
      });
      list.appendChild(el);
    });
  }

  #updateWaitingPlayers(players) {
    const c = document.getElementById('waiting-players');
    c.innerHTML = '';
    players?.forEach(p => {
      const el = document.createElement('div');
      el.className = 'waiting-player';
      // Escaped even though the server now constrains team to red/blue:
      // this string reaches innerHTML, so it should not depend on a second
      // component getting its validation right.
      const teamLabel = p.team ? ` [${this.#esc(String(p.team).toUpperCase())}]` : '';
      el.innerHTML = `<span class="player-dot" style="background:${this.#esc(String(p.color || '#fff'))}"></span> ${this.#esc(p.name)}${teamLabel}${p.isHost ? ' (Host)' : ''}`;
      c.appendChild(el);
    });
    document.getElementById('waiting-info').textContent = `${players?.length || 0} player(s) in room`;
  }

  #esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  // ── Persistence: autofill ─────────────────────────────────

  #autofill() {
    const name = PersistenceStore.getPlayerName();
    const skin = PersistenceStore.getSkinIndex();
    ['sp-name', 'cr-name', 'jr-name'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = name;
    });
    // Select saved skin swatch for the single-player tab
    ['sp', 'cr', 'jr'].forEach(prefix => {
      this.#skinIndices[prefix] = skin;
      const container = document.getElementById(`${prefix}-skin`);
      if (!container) return;
      const swatches = container.querySelectorAll('.skin-swatch');
      swatches.forEach((s, i) => s.classList.toggle('selected', i === skin));
    });
  }

  // ── Settings panel ────────────────────────────────────────

  #buildSettingsPanel() {
    const existing = document.getElementById('settings-overlay');
    if (existing) return; // already built by HTML

    const overlay = document.createElement('div');
    overlay.id = 'settings-overlay';
    overlay.style.cssText = `
      display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85);
      z-index:200; align-items:center; justify-content:center;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background:#1a1a22; border:1px solid #444; border-radius:8px;
      padding:32px; min-width:320px; color:#eee; font-family:inherit;
    `;
    panel.innerHTML = `
      <h2 style="margin:0 0 24px;color:#f80;font-size:22px;">⚙️ Settings</h2>
      <div class="lobby-field">
        <label>Mouse Sensitivity: <span id="sens-val">${PersistenceStore.getSensitivity().toFixed(1)}</span></label>
        <input type="range" id="settings-sens" min="0.1" max="5" step="0.1"
          value="${PersistenceStore.getSensitivity()}">
      </div>
      <div class="lobby-field">
        <label>FOV: <span id="fov-val">${PersistenceStore.getFOV()}</span></label>
        <input type="range" id="settings-fov" min="60" max="120" step="1"
          value="${PersistenceStore.getFOV()}">
      </div>
      <div class="lobby-field">
        <label>Volume: <span id="vol-val">${Math.round(PersistenceStore.getVolume() * 100)}%</span></label>
        <input type="range" id="settings-vol" min="0" max="1" step="0.01"
          value="${PersistenceStore.getVolume()}">
      </div>
      <button id="settings-close" class="lobby-btn" style="margin-top:16px;width:100%;">Close</button>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const sensInput = panel.querySelector('#settings-sens');
    const fovInput  = panel.querySelector('#settings-fov');
    const volInput  = panel.querySelector('#settings-vol');

    sensInput.addEventListener('input', () => {
      const v = parseFloat(sensInput.value);
      panel.querySelector('#sens-val').textContent = v.toFixed(1);
      PersistenceStore.setSensitivity(v);
    });
    fovInput.addEventListener('input', () => {
      const v = parseInt(fovInput.value);
      panel.querySelector('#fov-val').textContent = v;
      PersistenceStore.setFOV(v);
    });
    volInput.addEventListener('input', () => {
      const v = parseFloat(volInput.value);
      panel.querySelector('#vol-val').textContent = `${Math.round(v * 100)}%`;
      PersistenceStore.setVolume(v);
      // Also sync to AudioSystem volume key used by AudioSystem constructor
      localStorage.setItem('fps-arena-volume', String(v));
    });

    panel.querySelector('#settings-close').addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    // Open button
    const openBtn = document.getElementById('btn-settings');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
      });
    }
  }
}
