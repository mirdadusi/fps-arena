// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const watchdogSource = readFileSync(
  join(process.cwd(), 'public', 'startup-watchdog.js'),
  'utf8',
);

afterEach(() => {
  vi.useRealTimers();
  delete window.__arenaReady;
  delete window.__arenaFail;
  delete window.__arenaBooted;
});

describe('startup watchdog', () => {
  it('turns a stalled loader into a useful error and lets successful boot remove it', () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <div id="loading-overlay">
        <p id="loading-message">Loading Arena FPS…</p>
        <p id="loading-detail" style="display:none"></p>
        <button id="loading-retry" style="display:none"></button>
      </div>`;

    window.eval(watchdogSource);
    vi.advanceTimersByTime(10_000);

    expect(document.getElementById('loading-message').textContent).toBe('Arena FPS could not start');
    expect(document.getElementById('loading-detail').textContent).toContain('trailing slash');
    expect(document.getElementById('loading-retry').style.display).toBe('block');

    window.__arenaReady();
    expect(document.getElementById('loading-overlay')).toBeNull();
  });
});
