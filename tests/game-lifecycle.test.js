// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const rendererStats = vi.hoisted(() => ({ disposed: 0, contextsLost: 0 }));

vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal();
  class FakeWebGLRenderer {
    domElement = document.createElement('canvas');
    shadowMap = {};
    renderLists = { dispose() {} };
    setSize() {}
    setPixelRatio() {}
    render() {}
    dispose() { rendererStats.disposed++; }
    forceContextLoss() { rendererStats.contextsLost++; }
  }
  return { ...actual, WebGLRenderer: FakeWebGLRenderer };
});

import { Game } from '../src/Game.js';

function gameDOM() {
  document.body.innerHTML = `
    <div id="blocker"><button id="resume-game-btn"></button><button id="return-lobby-btn"></button></div>
    <div id="game-over"><div id="go-stats"></div><div id="go-personal-best"></div><div id="go-scoretable"></div></div>
    <span id="player-health"></span><div id="player-hp-bar"></div><span id="player-ammo"></span>
    <span id="hud-score"></span><span id="hud-kills"></span><span id="hud-timer"></span>
    <div id="enemy-health-bar"></div><div id="difficulty-badge"></div><div id="hitmarker"></div>
    <div id="kill-feed"></div><div id="powerup-bar"></div><span id="weapon-name"></span>
    <span id="grenade-count"></span><div id="team-scores"></div>
    <div id="weapon-slots"><i></i><i></i><i></i><i></i></div>
    <div id="damage-overlay"></div><div id="kill-message"></div><button id="mute-btn"></button>
    <div id="scoreboard" style="display:none"><table><tbody id="scoreboard-body"></tbody></table></div>
    <div id="chat-panel"><div id="chat-log"></div><input id="chat-input"></div>
    <canvas id="minimap"></canvas><div id="touch-controls"></div>
    <div id="context-lost-overlay"></div><div id="pointer-lock-error"></div>`;
}

function installListenerCounter() {
  const active = new Map();
  const originalAdd = EventTarget.prototype.addEventListener;
  const originalRemove = EventTarget.prototype.removeEventListener;
  const key = (target, type) => {
    if (!active.has(target)) active.set(target, new Map());
    const types = active.get(target);
    if (!types.has(type)) types.set(type, new Set());
    return types.get(type);
  };
  EventTarget.prototype.addEventListener = function (type, handler, options) {
    key(this, type).add(handler);
    return originalAdd.call(this, type, handler, options);
  };
  EventTarget.prototype.removeEventListener = function (type, handler, options) {
    key(this, type).delete(handler);
    return originalRemove.call(this, type, handler, options);
  };
  return {
    count() {
      let count = 0;
      for (const types of active.values()) for (const handlers of types.values()) count += handlers.size;
      return count;
    },
    restore() {
      EventTarget.prototype.addEventListener = originalAdd;
      EventTarget.prototype.removeEventListener = originalRemove;
    },
  };
}

beforeEach(() => {
  localStorage.clear();
  gameDOM();
  rendererStats.disposed = rendererStats.contextsLost = 0;
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect() {}, fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, fill() {}, stroke() {}, arc() {},
  }));
  globalThis.requestAnimationFrame = vi.fn(() => 1);
  globalThis.cancelAnimationFrame = vi.fn();
  Object.defineProperty(document, 'pointerLockElement', { value: null, configurable: true });
});

describe('Game restart lifecycle', () => {
  it('constructs and destroys repeatedly with zero listener or renderer growth', () => {
    const listeners = installListenerCounter();
    const baseline = listeners.count();
    try {
      for (let round = 0; round < 5; round++) {
        const game = new Game({ mode: 'single', arena: 'classic', botCount: 2, playerName: 'Test' }, () => {});
        expect(listeners.count()).toBeGreaterThan(baseline);
        game.destroy();
        game.destroy();
        expect(listeners.count()).toBe(baseline);
      }
      expect(rendererStats.disposed).toBe(5);
      expect(rendererStats.contextsLost).toBe(5);
      expect(document.body.classList.contains('game-active')).toBe(false);
    } finally {
      listeners.restore();
    }
  });

  it('constructs and tears down the procedural Village world', () => {
    const game = new Game({ mode: 'single', arena: 'village', botCount: 2, playerName: 'Explorer' }, () => {});
    expect(document.querySelectorAll('canvas')).toHaveLength(2);
    game.destroy();
    expect(document.querySelectorAll('canvas')).toHaveLength(1);
  });
});
