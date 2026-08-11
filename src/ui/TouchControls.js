import { Lifetime } from '../core/Lifetime.js';

/**
 * TouchControls — virtual joystick and buttons for mobile play.
 * Auto-detects touch devices and shows/hides UI accordingly.
 */
export class TouchControls {
  #el;
  #moveStick;
  #lookArea;
  #active = false;

  // State exposed to Game/Player
  moveX = 0;
  moveY = 0;
  lookDX = 0;
  lookDY = 0;
  shooting = false;
  wantsReload = false;
  wantsGrenade = false;
  wantsJump = false;
  crouching = false;
  weaponSwitch = -1; // -1 = none

  #moveOrigin = null;
  #moveTouch = null;
  #lookTouch = null;
  #lookPrev = null;
  #lifetime = new Lifetime();

  constructor() {
    this.#el = document.getElementById('touch-controls');
    if (!this.#el) return;

    this.#active = this.#isTouchDevice();
    if (!this.#active) { this.#el.style.display = 'none'; return; }

    this.#el.style.display = 'block';
    document.body.classList.add('is-touch');
    this.#bindTouch();
  }

  get active() { return this.#active; }

  #isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  #bindTouch() {
    const moveZone = document.getElementById('touch-move-zone');
    const lookZone = document.getElementById('touch-look-zone');

    // Move joystick
    this.#lifetime.listen(moveZone, 'touchstart', e => {
      e.preventDefault();
      const t = e.changedTouches[0];
      this.#moveTouch = t.identifier;
      this.#moveOrigin = { x: t.clientX, y: t.clientY };
    }, { passive: false });

    this.#lifetime.listen(moveZone, 'touchmove', e => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === this.#moveTouch && this.#moveOrigin) {
          const dx = t.clientX - this.#moveOrigin.x;
          const dy = t.clientY - this.#moveOrigin.y;
          const maxR = 50;
          const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxR);
          const angle = Math.atan2(dy, dx);
          this.moveX = (dist / maxR) * Math.cos(angle);
          this.moveY = (dist / maxR) * Math.sin(angle);

          // Visual feedback on stick
          const stick = document.getElementById('touch-stick-inner');
          if (stick) {
            stick.style.transform = `translate(${this.moveX * 30}px, ${this.moveY * 30}px)`;
          }
        }
      }
    }, { passive: false });

    const endMove = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.#moveTouch) {
          this.#moveTouch = null;
          this.#moveOrigin = null;
          this.moveX = 0;
          this.moveY = 0;
          const stick = document.getElementById('touch-stick-inner');
          if (stick) stick.style.transform = 'translate(0, 0)';
        }
      }
    };
    this.#lifetime.listen(moveZone, 'touchend', endMove);
    this.#lifetime.listen(moveZone, 'touchcancel', endMove);

    // Look area (right side)
    this.#lifetime.listen(lookZone, 'touchstart', e => {
      e.preventDefault();
      const t = e.changedTouches[0];
      this.#lookTouch = t.identifier;
      this.#lookPrev = { x: t.clientX, y: t.clientY };
      this.shooting = true;
    }, { passive: false });

    this.#lifetime.listen(lookZone, 'touchmove', e => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === this.#lookTouch && this.#lookPrev) {
          this.lookDX = (t.clientX - this.#lookPrev.x) * 0.4;
          this.lookDY = (t.clientY - this.#lookPrev.y) * 0.4;
          this.#lookPrev = { x: t.clientX, y: t.clientY };
        }
      }
    }, { passive: false });

    const endLook = e => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.#lookTouch) {
          this.#lookTouch = null;
          this.#lookPrev = null;
          this.shooting = false;
          this.lookDX = 0;
          this.lookDY = 0;
        }
      }
    };
    this.#lifetime.listen(lookZone, 'touchend', endLook);
    this.#lifetime.listen(lookZone, 'touchcancel', endLook);

    // Action buttons
    this.#lifetime.listen(document.getElementById('touch-btn-reload'), 'touchstart', e => {
      e.preventDefault(); this.wantsReload = true;
    });
    this.#lifetime.listen(document.getElementById('touch-btn-reload'), 'touchend', () => { this.wantsReload = false; });

    this.#lifetime.listen(document.getElementById('touch-btn-grenade'), 'touchstart', e => {
      e.preventDefault(); this.wantsGrenade = true;
    });
    this.#lifetime.listen(document.getElementById('touch-btn-grenade'), 'touchend', () => { this.wantsGrenade = false; });

    this.#lifetime.listen(document.getElementById('touch-btn-jump'), 'touchstart', e => {
      e.preventDefault(); this.wantsJump = true;
    });
    this.#lifetime.listen(document.getElementById('touch-btn-jump'), 'touchend', () => { this.wantsJump = false; });

    this.#lifetime.listen(document.getElementById('touch-btn-crouch'), 'touchstart', e => {
      e.preventDefault(); this.crouching = true;
    });
    this.#lifetime.listen(document.getElementById('touch-btn-crouch'), 'touchend', () => { this.crouching = false; });

    // Weapon switch buttons
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`touch-btn-w${i}`);
      this.#lifetime.listen(btn, 'touchstart', e => {
        e.preventDefault();
        this.weaponSwitch = i;
      });
    }
  }

  /** Call each frame to consume one-shot inputs. */
  consumeFrame() {
    this.lookDX = 0;
    this.lookDY = 0;
    if (this.weaponSwitch >= 0) {
      const ws = this.weaponSwitch;
      this.weaponSwitch = -1;
      return ws;
    }
    return -1;
  }

  destroy() {
    this.#lifetime.dispose();
    this.#el?.style.setProperty('display', 'none');
    document.body.classList.remove('is-touch');
    this.moveX = this.moveY = this.lookDX = this.lookDY = 0;
    this.shooting = this.wantsReload = this.wantsGrenade = this.wantsJump = this.crouching = false;
  }
}
