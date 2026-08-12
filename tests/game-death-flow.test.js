// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('three', async importOriginal => {
  const actual = await importOriginal();
  class FakeWebGLRenderer {
    domElement = document.createElement('canvas');
    shadowMap = {};
    renderLists = { dispose() {} };
    setSize() {}
    setPixelRatio() {}
    render() {}
    dispose() {}
    forceContextLoss() {}
  }
  return { ...actual, WebGLRenderer: FakeWebGLRenderer };
});

vi.mock('../src/systems/GrenadeSystem.js', () => ({
  GrenadeSystem: class {
    count = 3;
    #firstUpdate = true;
    throw() { return false; }
    update() {
      if (this.#firstUpdate) {
        this.#firstUpdate = false;
        return { playerDamage: 100, enemyHits: [], remoteHits: [], explosionCount: 1 };
      }
      return { playerDamage: 0, enemyHits: [], remoteHits: [], explosionCount: 0 };
    }
    reset() { this.count = 3; }
    dispose() {}
  },
}));

import { Game } from '../src/Game.js';

function installDOM() {
  document.body.innerHTML = `
    <div id="blocker"><button id="resume-game-btn"></button><button id="return-lobby-btn"></button></div>
    <div id="game-over" style="display:none"><div id="go-cause"></div><div id="go-stats"></div>
      <div id="go-personal-best"></div><div id="go-scoretable"></div><button id="respawn-game-btn">RESPAWN</button></div>
    <span id="player-health"></span><div id="player-hp-bar"></div><span id="player-ammo"></span>
    <span id="hud-score"></span><span id="hud-kills"></span><span id="hud-timer"></span>
    <div id="enemy-health-bar"></div><div id="difficulty-badge"></div><div id="hitmarker"></div>
    <div id="kill-feed"></div><div id="powerup-bar"></div><span id="weapon-name"></span>
    <span id="grenade-count"></span><div id="team-scores"></div>
    <div id="weapon-slots"><i></i><i></i><i></i><i></i></div>
    <div id="damage-overlay"></div><div id="kill-message"></div><button id="mute-btn"></button>
    <div id="scoreboard"><table><tbody id="scoreboard-body"></tbody></table></div>
    <div id="chat-panel"><div id="chat-log"></div><input id="chat-input"></div>
    <canvas id="minimap"></canvas><div id="context-lost-overlay"></div><div id="pointer-lock-error"></div>
    <div id="touch-controls"><div id="touch-move-zone"><div id="touch-stick-inner"></div></div>
      <div id="touch-look-zone"></div><div id="touch-btn-menu"></div><div id="touch-btn-fire"></div>
      <div id="touch-btn-reload"></div><div id="touch-btn-grenade"></div><div id="touch-btn-jump"></div>
      <div id="touch-btn-crouch"></div><div id="touch-btn-w0"></div><div id="touch-btn-w1"></div>
      <div id="touch-btn-w2"></div><div id="touch-btn-w3"></div></div>`;
}

beforeEach(() => {
  localStorage.clear();
  installDOM();
  Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, configurable: true });
  Object.defineProperty(document, 'exitPointerLock', { value: undefined, configurable: true });
  globalThis.requestAnimationFrame = vi.fn(() => 1);
  globalThis.cancelAnimationFrame = vi.fn();
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect() {}, fillRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, fill() {}, stroke() {}, arc() {},
  }));
});

describe('Game mobile death flow', () => {
  it('shows lethal grenade damage immediately even without Pointer Lock support', () => {
    const game = new Game({ mode: 'single', arena: 'classic', botCount: 0, playerName: 'Touch' }, () => {});
    expect(document.getElementById('game-over').style.display).toBe('flex');
    expect(document.getElementById('go-cause').textContent).toBe('Caught in a grenade explosion');

    document.getElementById('respawn-game-btn').dispatchEvent(
      new Event('pointerdown', { bubbles: true, cancelable: true }),
    );
    expect(document.getElementById('game-over').style.display).toBe('none');
    game.destroy();
  });
});

