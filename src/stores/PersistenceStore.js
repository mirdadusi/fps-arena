/**
 * PersistenceStore — thin wrapper around localStorage.
 * All keys use the `fps-arena.` prefix.
 *
 * ScoreEntry shape:
 *   { score: number, kills: number, time: string, maxStreak: number, date: string }
 */

const PREFIX = 'fps-arena.';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* storage full */ }
}

export const PersistenceStore = {
  // ── High scores ──────────────────────────────────────────

  /** @returns {Array<{score:number,kills:number,time:string,maxStreak:number,date:string}>} */
  getScores() {
    return read('scores', []);
  },

  /** @param {{score:number,kills:number,time:string,maxStreak:number,date:string}} entry */
  saveScore(entry) {
    const scores = this.getScores();
    scores.push(entry);
    scores.sort((a, b) => b.score - a.score);
    write('scores', scores.slice(0, 10));
  },

  clearScores() {
    write('scores', []);
  },

  // ── Player profile ───────────────────────────────────────

  getPlayerName()       { return read('playerName', 'Player'); },
  setPlayerName(name)   { write('playerName', String(name)); },

  getSkinIndex()        { return read('skinIndex', 0); },
  setSkinIndex(idx)     { write('skinIndex', Number(idx)); },

  // ── Settings ─────────────────────────────────────────────

  getSensitivity()      { return read('sensitivity', 1.0); },
  setSensitivity(v)     { write('sensitivity', Math.max(0.1, Math.min(5.0, Number(v)))); },

  getFOV()              { return read('fov', 75); },
  setFOV(v)             { write('fov', Math.max(60, Math.min(120, Number(v)))); },

  getVolume()           { return read('volume', 0.4); },
  setVolume(v)          { write('volume', Math.max(0, Math.min(1, Number(v)))); },
};
