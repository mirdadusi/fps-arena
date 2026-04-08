const PLAYER_COLORS = ['#4488ff', '#ff8844', '#44ff88', '#ff44ff', '#ffff44', '#44ffff', '#ff4444', '#88ff44'];

export class Room {
  constructor(id, name, arena, maxPlayers, botCount, hostId, gameMode = 'ffa') {
    this.id = id;
    this.name = name;
    this.arena = arena;
    this.maxPlayers = maxPlayers;
    this.botCount = botCount;
    this.hostId = hostId;
    this.gameMode = gameMode; // 'ffa' | 'tdm' | 'ctf'
    this.players = new Map();
    this.started = false;
    this.nextColor = 0;
  }

  addPlayer(playerId, ws, name, team = null, skinIndex = 0) {
    const color = PLAYER_COLORS[this.nextColor++ % PLAYER_COLORS.length];
    const isHost = this.players.size === 0 || playerId === this.hostId;
    this.players.set(playerId, {
      ws, name, color, isHost, team, skinIndex,
      kills: 0, deaths: 0, score: 0,
    });
    return { color, isHost };
  }

  removePlayer(playerId) {
    this.players.delete(playerId);
    if (playerId === this.hostId && this.players.size > 0) {
      const [newHostId, p] = this.players.entries().next().value;
      this.hostId = newHostId;
      p.isHost = true;
    }
  }

  /** Auto-assign team to balance teams. */
  getAutoTeam() {
    let redCount = 0, blueCount = 0;
    for (const [, p] of this.players) {
      if (p.team === 'red') redCount++;
      else if (p.team === 'blue') blueCount++;
    }
    return redCount <= blueCount ? 'red' : 'blue';
  }

  isFull()  { return this.players.size >= this.maxPlayers; }
  isEmpty() { return this.players.size === 0; }

  broadcast(msg, excludeId = null) {
    const data = JSON.stringify(msg);
    for (const [id, p] of this.players) {
      if (id !== excludeId && p.ws.readyState === 1) p.ws.send(data);
    }
  }

  getPlayerList() {
    return Array.from(this.players.entries()).map(([id, p]) => ({
      id, name: p.name, color: p.color, isHost: p.isHost,
      kills: p.kills, deaths: p.deaths, score: p.score,
      team: p.team, skinIndex: p.skinIndex,
    }));
  }

  toJSON() {
    return {
      id: this.id, name: this.name, arena: this.arena,
      maxPlayers: this.maxPlayers, botCount: this.botCount,
      playerCount: this.players.size, started: this.started,
      gameMode: this.gameMode,
    };
  }
}
