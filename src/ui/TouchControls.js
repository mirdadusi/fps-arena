import { Lifetime } from '../core/Lifetime.js';

const MOVE_RADIUS = 50;
const LOOK_SCALE = 0.65;

/**
 * Dual-stick mobile controls. Pointer Events are preferred because pointer
 * capture keeps independent move/look/fire fingers reliable on iPadOS.
 */
export class TouchControls {
  #el;
  #moveZone;
  #lookZone;
  #stick;
  #active = false;
  #movePointer = null;
  #lookPointer = null;
  #moveOriginX = 0;
  #moveOriginY = 0;
  #lookPrevX = 0;
  #lookPrevY = 0;
  #lifetime = new Lifetime();

  moveX = 0;
  moveY = 0;
  lookDX = 0;
  lookDY = 0;
  shooting = false;
  wantsReload = false;
  wantsGrenade = false;
  wantsJump = false;
  crouching = false;
  wantsMenu = false;
  weaponSwitch = -1;

  constructor() {
    this.#el = document.getElementById('touch-controls');
    if (!this.#el) return;

    this.#active = this.#isTouchDevice();
    if (!this.#active) {
      this.#el.style.display = 'none';
      return;
    }

    this.#moveZone = document.getElementById('touch-move-zone');
    this.#lookZone = document.getElementById('touch-look-zone');
    this.#stick = document.getElementById('touch-stick-inner');
    this.#el.style.display = 'block';
    document.body.classList.add('is-touch');

    if (typeof window.PointerEvent === 'function') this.#bindPointerEvents();
    else this.#bindLegacyTouchEvents();
    this.#bindActionButtons();

    this.#lifetime.listen(window, 'blur', () => this.#resetState());
    this.#lifetime.listen(document, 'visibilitychange', () => {
      if (document.hidden) this.#resetState();
    });
  }

  get active() { return this.#active; }

  #isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  #bindPointerEvents() {
    this.#lifetime.listen(this.#moveZone, 'pointerdown', e => {
      if (this.#movePointer !== null) return;
      e.preventDefault();
      this.#movePointer = e.pointerId;
      this.#moveOriginX = e.clientX;
      this.#moveOriginY = e.clientY;
      this.#capture(e.currentTarget, e.pointerId);
    });
    this.#lifetime.listen(this.#moveZone, 'pointermove', e => {
      if (e.pointerId !== this.#movePointer) return;
      e.preventDefault();
      this.#updateMove(e.clientX, e.clientY);
    });
    const endMove = e => {
      if (e.pointerId === this.#movePointer) this.#resetMove();
    };
    this.#lifetime.listen(this.#moveZone, 'pointerup', endMove);
    this.#lifetime.listen(this.#moveZone, 'pointercancel', endMove);
    this.#lifetime.listen(this.#moveZone, 'lostpointercapture', endMove);

    this.#lifetime.listen(this.#lookZone, 'pointerdown', e => {
      if (this.#lookPointer !== null) return;
      e.preventDefault();
      this.#lookPointer = e.pointerId;
      this.#lookPrevX = e.clientX;
      this.#lookPrevY = e.clientY;
      this.#capture(e.currentTarget, e.pointerId);
    });
    this.#lifetime.listen(this.#lookZone, 'pointermove', e => {
      if (e.pointerId !== this.#lookPointer) return;
      e.preventDefault();
      this.#updateLook(e.clientX, e.clientY);
    });
    const endLook = e => {
      if (e.pointerId === this.#lookPointer) this.#resetLook();
    };
    this.#lifetime.listen(this.#lookZone, 'pointerup', endLook);
    this.#lifetime.listen(this.#lookZone, 'pointercancel', endLook);
    this.#lifetime.listen(this.#lookZone, 'lostpointercapture', endLook);
  }

  /** Touch Events fallback for iOS versions before Pointer Events. */
  #bindLegacyTouchEvents() {
    this.#lifetime.listen(this.#moveZone, 'touchstart', e => {
      if (this.#movePointer !== null) return;
      e.preventDefault();
      const touch = e.changedTouches.item(0);
      if (!touch) return;
      this.#movePointer = touch.identifier;
      this.#moveOriginX = touch.clientX;
      this.#moveOriginY = touch.clientY;
    }, { passive: false });
    this.#lifetime.listen(this.#moveZone, 'touchmove', e => {
      e.preventDefault();
      this.#forChangedTouch(e, touch => {
        if (touch.identifier === this.#movePointer) this.#updateMove(touch.clientX, touch.clientY);
      });
    }, { passive: false });
    const endMove = e => this.#forChangedTouch(e, touch => {
      if (touch.identifier === this.#movePointer) this.#resetMove();
    });
    this.#lifetime.listen(this.#moveZone, 'touchend', endMove, { passive: false });
    this.#lifetime.listen(this.#moveZone, 'touchcancel', endMove, { passive: false });

    this.#lifetime.listen(this.#lookZone, 'touchstart', e => {
      if (this.#lookPointer !== null) return;
      e.preventDefault();
      const touch = e.changedTouches.item(0);
      if (!touch) return;
      this.#lookPointer = touch.identifier;
      this.#lookPrevX = touch.clientX;
      this.#lookPrevY = touch.clientY;
    }, { passive: false });
    this.#lifetime.listen(this.#lookZone, 'touchmove', e => {
      e.preventDefault();
      this.#forChangedTouch(e, touch => {
        if (touch.identifier === this.#lookPointer) this.#updateLook(touch.clientX, touch.clientY);
      });
    }, { passive: false });
    const endLook = e => this.#forChangedTouch(e, touch => {
      if (touch.identifier === this.#lookPointer) this.#resetLook();
    });
    this.#lifetime.listen(this.#lookZone, 'touchend', endLook, { passive: false });
    this.#lifetime.listen(this.#lookZone, 'touchcancel', endLook, { passive: false });
  }

  #bindActionButtons() {
    const holdActions = [
      ['touch-btn-fire', value => { this.shooting = value; }],
      ['touch-btn-reload', value => { this.wantsReload = value; }],
      ['touch-btn-grenade', value => { this.wantsGrenade = value; }],
      ['touch-btn-jump', value => { this.wantsJump = value; }],
      ['touch-btn-crouch', value => { this.crouching = value; }],
    ];

    for (const [id, setValue] of holdActions) {
      const button = document.getElementById(id);
      if (typeof window.PointerEvent === 'function') {
        let pointer = null;
        this.#lifetime.listen(button, 'pointerdown', e => {
          e.preventDefault();
          e.stopPropagation();
          pointer = e.pointerId;
          setValue(true);
          this.#capture(e.currentTarget, e.pointerId);
        });
        const release = e => {
          if (pointer !== null && e.pointerId === pointer) {
            pointer = null;
            setValue(false);
          }
        };
        this.#lifetime.listen(button, 'pointerup', release);
        this.#lifetime.listen(button, 'pointercancel', release);
        this.#lifetime.listen(button, 'lostpointercapture', release);
      } else {
        this.#lifetime.listen(button, 'touchstart', e => {
          e.preventDefault();
          e.stopPropagation();
          setValue(true);
        }, { passive: false });
        const release = e => { e.preventDefault(); setValue(false); };
        this.#lifetime.listen(button, 'touchend', release, { passive: false });
        this.#lifetime.listen(button, 'touchcancel', release, { passive: false });
      }
    }

    const menuButton = document.getElementById('touch-btn-menu');
    const menuEvent = typeof window.PointerEvent === 'function' ? 'pointerdown' : 'touchstart';
    this.#lifetime.listen(menuButton, menuEvent, e => {
      e.preventDefault();
      e.stopPropagation();
      this.wantsMenu = true;
    }, { passive: false });

    for (let i = 0; i < 4; i++) {
      const button = document.getElementById(`touch-btn-w${i}`);
      const eventName = typeof window.PointerEvent === 'function' ? 'pointerdown' : 'touchstart';
      this.#lifetime.listen(button, eventName, e => {
        e.preventDefault();
        e.stopPropagation();
        this.weaponSwitch = i;
      }, { passive: false });
    }
  }

  #capture(target, pointerId) {
    try { target?.setPointerCapture?.(pointerId); } catch { /* capture is an optimisation */ }
  }

  #forChangedTouch(event, callback) {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches.item(i);
      if (touch) callback(touch);
    }
  }

  #updateMove(clientX, clientY) {
    const dx = clientX - this.#moveOriginX;
    const dy = clientY - this.#moveOriginY;
    const distance = Math.hypot(dx, dy);
    const clamp = distance > MOVE_RADIUS ? MOVE_RADIUS / distance : 1;
    this.moveX = (dx * clamp) / MOVE_RADIUS;
    this.moveY = (dy * clamp) / MOVE_RADIUS;
    if (this.#stick) {
      this.#stick.style.transform = `translate(${this.moveX * 30}px, ${this.moveY * 30}px)`;
    }
  }

  #updateLook(clientX, clientY) {
    // Accumulate rather than overwrite. iPad can deliver two or more pointer
    // samples between animation frames; overwriting silently discarded most
    // of a swipe and made camera movement appear broken.
    this.lookDX += (clientX - this.#lookPrevX) * LOOK_SCALE;
    this.lookDY += (clientY - this.#lookPrevY) * LOOK_SCALE;
    this.#lookPrevX = clientX;
    this.#lookPrevY = clientY;
  }

  #resetMove() {
    this.#movePointer = null;
    this.moveX = 0;
    this.moveY = 0;
    if (this.#stick) this.#stick.style.transform = 'translate(0, 0)';
  }

  #resetLook() {
    this.#lookPointer = null;
  }

  #resetState() {
    this.#resetMove();
    this.#resetLook();
    this.lookDX = 0;
    this.lookDY = 0;
    this.shooting = false;
    this.wantsReload = false;
    this.wantsGrenade = false;
    this.wantsJump = false;
    this.crouching = false;
    this.wantsMenu = false;
  }

  /** Release every held pointer before the game enters a modal menu. */
  releaseAll() {
    this.#resetState();
  }

  /** Consume per-frame look and one-shot weapon inputs. */
  consumeFrame() {
    this.lookDX = 0;
    this.lookDY = 0;
    if (this.weaponSwitch >= 0) {
      const weapon = this.weaponSwitch;
      this.weaponSwitch = -1;
      return weapon;
    }
    return -1;
  }

  destroy() {
    this.#lifetime.dispose();
    this.#resetState();
    this.weaponSwitch = -1;
    this.#el?.style.setProperty('display', 'none');
    document.body.classList.remove('is-touch');
  }
}
