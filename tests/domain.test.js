// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { PersistenceStore } from '../src/stores/PersistenceStore.js';
import { Room } from '../server/Room.js';
import { normalizePublicPath } from '../server/StaticRouter.js';

beforeEach(() => localStorage.clear());

describe('PersistenceStore', () => {
  it('clamps settings and keeps only the ten highest scores', () => {
    PersistenceStore.setSensitivity(99);
    PersistenceStore.setFOV(10);
    PersistenceStore.setVolume(-1);
    expect(PersistenceStore.getSensitivity()).toBe(5);
    expect(PersistenceStore.getFOV()).toBe(60);
    expect(PersistenceStore.getVolume()).toBe(0);

    for (let score = 0; score < 14; score++) {
      PersistenceStore.saveScore({ score, kills: score, time: '0:10', maxStreak: 1, date: 'today' });
    }
    expect(PersistenceStore.getScores()).toHaveLength(10);
    expect(PersistenceStore.getScores()[0].score).toBe(13);
    expect(PersistenceStore.getScores().at(-1).score).toBe(4);
  });

  it('accepts only bounded image data URLs for bot portraits', () => {
    PersistenceStore.setBotPortrait('https://example.com/photo.jpg');
    expect(PersistenceStore.getBotPortrait()).toBeNull();
    PersistenceStore.setBotPortrait('data:image/jpeg;base64,abc');
    expect(PersistenceStore.getBotPortrait()).toBe('data:image/jpeg;base64,abc');
    PersistenceStore.clearBotPortrait();
    expect(PersistenceStore.getBotPortrait()).toBeNull();
  });
});

describe('Room', () => {
  const socket = () => ({ readyState: 1, sent: [], send(data) { this.sent.push(JSON.parse(data)); } });

  it('balances teams and transfers host ownership', () => {
    const room = new Room('r1', 'Arena', 'classic', 4, 0, 'p1', 'tdm');
    room.addPlayer('p1', socket(), 'One', 'red');
    expect(room.getAutoTeam()).toBe('blue');
    room.addPlayer('p2', socket(), 'Two', 'blue');
    room.removePlayer('p1');
    expect(room.hostId).toBe('p2');
    expect(room.getPlayerList()[0].isHost).toBe(true);
  });

  it('broadcasts around temporarily disconnected players', () => {
    const room = new Room('r1', 'Arena', 'classic', 4, 0, 'p1');
    const online = socket();
    room.addPlayer('p1', online, 'One');
    room.addPlayer('p2', null, 'Two');
    expect(() => room.broadcast({ type: 'PING' })).not.toThrow();
    expect(online.sent).toEqual([{ type: 'PING' }]);
  });
});

describe('static deployment routes', () => {
  it('serves root and canonical subpath assets with a trailing-slash redirect', () => {
    expect(normalizePublicPath('/')).toEqual({ redirect: null, pathname: '/' });
    expect(normalizePublicPath('/arena-fps', '?mode=solo')).toEqual({
      redirect: '/arena-fps/?mode=solo',
      pathname: '/',
    });
    expect(normalizePublicPath('/arena-fps/assets/game.js')).toEqual({
      redirect: null,
      pathname: '/assets/game.js',
    });
  });
});
