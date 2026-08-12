// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UIManager } from '../src/ui/UIManager.js';

describe('mobile death and respawn UI', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div id="blocker"></div>
      <div id="game-over" style="display:none">
        <div id="go-cause"></div><div id="go-stats"></div>
        <div id="go-personal-best"></div><div id="go-scoretable"></div>
        <button id="respawn-game-btn" type="button">RESPAWN</button>
      </div>`;
  });

  it('shows the cause immediately and activates respawn on pointerdown once', () => {
    const ui = new UIManager();
    const respawn = vi.fn();
    ui.onRespawn(respawn);
    ui.showGameOver({ score: 80, kills: 2, time: '0:42', maxStreak: 2 }, 'Caught in a grenade explosion');

    expect(document.getElementById('game-over').style.display).toBe('flex');
    expect(document.getElementById('go-cause').textContent).toBe('Caught in a grenade explosion');
    const button = document.getElementById('respawn-game-btn');
    button.dispatchEvent(new Event('pointerdown', { bubbles: true, cancelable: true }));
    button.click();
    expect(respawn).toHaveBeenCalledOnce();
    ui.destroy();
  });
});
