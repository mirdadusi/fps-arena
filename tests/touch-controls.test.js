// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TouchControls } from '../src/ui/TouchControls.js';

class TestPointerEvent extends Event {
  constructor(type, init = {}) {
    super(type, { bubbles: true, cancelable: true });
    this.pointerId = init.pointerId ?? 1;
    this.pointerType = init.pointerType ?? 'touch';
    this.clientX = init.clientX ?? 0;
    this.clientY = init.clientY ?? 0;
  }
}

function dispatchPointer(target, type, init) {
  target.dispatchEvent(new TestPointerEvent(type, init));
}

describe('TouchControls', () => {
  let controls;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="touch-controls">
        <div id="touch-move-zone"><div id="touch-stick-inner"></div></div>
        <div id="touch-look-zone"></div>
        <div id="touch-btn-fire"></div><div id="touch-btn-reload"></div>
        <div id="touch-btn-grenade"></div><div id="touch-btn-jump"></div>
        <div id="touch-btn-crouch"></div>
        <div id="touch-btn-w0"></div><div id="touch-btn-w1"></div>
        <div id="touch-btn-w2"></div><div id="touch-btn-w3"></div>
      </div>`;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, configurable: true });
    Object.defineProperty(window, 'PointerEvent', { value: TestPointerEvent, configurable: true });
    HTMLElement.prototype.setPointerCapture = () => {};
    controls = new TouchControls();
  });

  afterEach(() => {
    controls?.destroy();
    delete HTMLElement.prototype.setPointerCapture;
  });

  it('accumulates every look sample until the render frame consumes it', () => {
    const zone = document.getElementById('touch-look-zone');
    dispatchPointer(zone, 'pointerdown', { pointerId: 7, clientX: 400, clientY: 200 });
    dispatchPointer(zone, 'pointermove', { pointerId: 7, clientX: 410, clientY: 205 });
    dispatchPointer(zone, 'pointermove', { pointerId: 7, clientX: 425, clientY: 210 });
    dispatchPointer(zone, 'pointerup', { pointerId: 7, clientX: 425, clientY: 210 });

    expect(controls.lookDX).toBeCloseTo(25 * 0.65);
    expect(controls.lookDY).toBeCloseTo(10 * 0.65);
    expect(controls.shooting).toBe(false);
    controls.consumeFrame();
    expect(controls.lookDX).toBe(0);
    expect(controls.lookDY).toBe(0);
  });

  it('keeps aiming and firing on independent pointers', () => {
    const look = document.getElementById('touch-look-zone');
    const fire = document.getElementById('touch-btn-fire');
    dispatchPointer(look, 'pointerdown', { pointerId: 1, clientX: 500, clientY: 250 });
    dispatchPointer(fire, 'pointerdown', { pointerId: 2, clientX: 700, clientY: 500 });
    expect(controls.shooting).toBe(true);

    dispatchPointer(look, 'pointermove', { pointerId: 1, clientX: 520, clientY: 250 });
    expect(controls.lookDX).toBeGreaterThan(0);
    dispatchPointer(fire, 'pointerup', { pointerId: 2, clientX: 700, clientY: 500 });
    expect(controls.shooting).toBe(false);
  });

  it('normalizes and resets the movement stick', () => {
    const zone = document.getElementById('touch-move-zone');
    dispatchPointer(zone, 'pointerdown', { pointerId: 3, clientX: 80, clientY: 500 });
    dispatchPointer(zone, 'pointermove', { pointerId: 3, clientX: 180, clientY: 500 });
    expect(controls.moveX).toBeCloseTo(1);
    expect(controls.moveY).toBeCloseTo(0);
    dispatchPointer(zone, 'pointerup', { pointerId: 3, clientX: 180, clientY: 500 });
    expect(controls.moveX).toBe(0);
  });
});
