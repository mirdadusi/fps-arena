import * as THREE from 'three';
import { Config } from '../Config.js';
import { PersistenceStore } from '../stores/PersistenceStore.js';

/**
 * Radians of rotation per pixel of raw mouse movement, before the player's
 * own sensitivity multiplier. Roughly 10 cm of mouse travel per 360° at
 * 800 DPI, which is a conventional starting point for an arena shooter.
 */
const MOUSE_RADIANS_PER_PIXEL = 0.002;

/** Reused across frames — allocating these per frame is pure GC churn. */
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _moveDir = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

function wrapAngle(angle) {
  return THREE.MathUtils.euclideanModulo(angle + Math.PI, Math.PI * 2) - Math.PI;
}

/**
 * Player — owns first-person camera movement, health, and input state.
 * Supports both keyboard/mouse and touch controls.
 */
export class Player {
  hp = Config.player.maxHP;
  yaw = 0;
  pitch = 0;
  verticalVelocity = 0;
  isGrounded = true;
  isCrouching = false;
  #keys = {};
  #height = Config.player.height;
  #jumpQueued = false;
  #sensitivity = 1;
  #onKeyDown = null;
  #onKeyUp = null;
  #onMouse = null;

  constructor(camera) {
    this.camera = camera;
    this.refreshSensitivity();
    this.#bindInput();
  }

  get position() { return this.camera.position; }
  get isMoving() {
    return !!(this.#keys['KeyW'] || this.#keys['KeyS'] || this.#keys['KeyA'] || this.#keys['KeyD']);
  }

  #bindInput() {
    // Handlers are kept so destroy() can remove them. Anonymous arrows here
    // meant every restart stacked another live listener on document.
    this.#onKeyDown = (e) => {
      this.#keys[e.code] = true;
      if (e.code === 'Space' && !e.repeat) this.#jumpQueued = true;
    };
    this.#onKeyUp   = (e) => { this.#keys[e.code] = false; };
    this.#onMouse   = (e) => this.#onMouseMove(e);

    document.addEventListener('keydown', this.#onKeyDown);
    document.addEventListener('keyup', this.#onKeyUp);
    document.addEventListener('mousemove', this.#onMouse);
  }

  /**
   * Sensitivity is cached, not read per event.
   *
   * This used to call PersistenceStore.getSensitivity() inside the mousemove
   * handler — a synchronous localStorage read plus a JSON.parse on every
   * event. Mice report at 125–1000 Hz, so that was up to a thousand blocking
   * storage reads a second fighting the render loop, and it made the camera
   * feel heavy and late.
   */
  refreshSensitivity() {
    this.#sensitivity = PersistenceStore.getSensitivity();
  }

  #onMouseMove(e) {
    if (!document.pointerLockElement) return;
    this.yaw   -= e.movementX * MOUSE_RADIANS_PER_PIXEL * this.#sensitivity;
    this.yaw = wrapAngle(this.yaw);
    this.pitch -= e.movementY * MOUSE_RADIANS_PER_PIXEL * this.#sensitivity;
    this.pitch  = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, this.pitch));
  }

  destroy() {
    document.removeEventListener('keydown', this.#onKeyDown);
    document.removeEventListener('keyup', this.#onKeyUp);
    document.removeEventListener('mousemove', this.#onMouse);
  }

  wantsReload() { return !!this.#keys['KeyR']; }
  get bodyHeight() { return this.#height; }

  /**
   * @returns {THREE.Vector3} A SHARED scratch vector, valid only until the
   * next call. Copy it if you need to keep it.
   */
  update(dt, speedMultiplier = 1) {
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    const forward = _forward.set(0, 0, -1).applyAxisAngle(_up, this.yaw);
    const right   = _right.set(1, 0, 0).applyAxisAngle(_up, this.yaw);
    this.isCrouching = !!(this.#keys['ControlLeft'] || this.#keys['ControlRight'] || this.#keys['KeyC']);
    const sprint  = !this.isCrouching && (this.#keys['ShiftLeft'] || this.#keys['ShiftRight']);
    const stanceMultiplier = this.isCrouching ? Config.player.crouchMultiplier : 1;
    const speed   = Config.player.speed * (sprint ? Config.player.sprintMultiplier : 1) * stanceMultiplier * speedMultiplier;

    const moveDir = _moveDir.set(0, 0, 0);
    if (this.#keys['KeyW']) moveDir.add(forward);
    if (this.#keys['KeyS']) moveDir.sub(forward);
    if (this.#keys['KeyD']) moveDir.add(right);
    if (this.#keys['KeyA']) moveDir.sub(right);
    if (moveDir.lengthSq() > 0) moveDir.normalize();

    this.position.x += moveDir.x * speed * dt;
    this.position.z += moveDir.z * speed * dt;

    return moveDir;
  }

  /** Touch control update — joystick movement + look deltas. */
  updateFromTouch(dt, moveX, moveY, lookDX, lookDY, speedMultiplier = 1) {
    // Look
    this.yaw -= lookDX * 0.005;
    this.yaw = wrapAngle(this.yaw);
    this.pitch -= lookDY * 0.005;
    this.pitch = Math.max(-Math.PI/2 + 0.05, Math.min(Math.PI/2 - 0.05, this.pitch));

    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    // Movement from joystick
    if (Math.abs(moveX) > 0.05 || Math.abs(moveY) > 0.05) {
      const forward = _forward.set(0, 0, -1).applyAxisAngle(_up, this.yaw);
      const right = _right.set(1, 0, 0).applyAxisAngle(_up, this.yaw);
      const stanceMultiplier = this.isCrouching ? Config.player.crouchMultiplier : 1;
      const speed = Config.player.speed * stanceMultiplier * speedMultiplier;

      // moveX is left-right, moveY is forward-back (inverted: up on stick = forward = -Y)
      const moveDir = _moveDir.set(0, 0, 0);
      moveDir.add(right.multiplyScalar(moveX));
      moveDir.add(forward.multiplyScalar(-moveY));
      if (moveDir.length() > 1) moveDir.normalize();

      this.position.x += moveDir.x * speed * dt;
      this.position.z += moveDir.z * speed * dt;
    }
  }

  /** Apply gravity, jumping, crouching and ceiling-aware stance changes. */
  updateVertical(dt, physics, touchJump = false, touchCrouch = false) {
    const oldHeight = this.#height;
    const feetY = this.position.y - oldHeight;
    const keyboardCrouch = !!(this.#keys['ControlLeft'] || this.#keys['ControlRight'] || this.#keys['KeyC']);
    const wantsCrouch = keyboardCrouch || touchCrouch;
    this.isCrouching = wantsCrouch;
    let targetHeight = wantsCrouch ? Config.player.crouchHeight : Config.player.height;

    if (targetHeight > oldHeight && !physics.canOccupy(this.position, Config.player.radius, feetY, targetHeight)) {
      targetHeight = Config.player.crouchHeight;
      this.isCrouching = true;
    }
    const response = 1 - Math.exp(-Config.player.stanceResponse * dt);
    this.#height = THREE.MathUtils.lerp(oldHeight, targetHeight, response);

    if ((this.#jumpQueued || touchJump) && this.isGrounded && !wantsCrouch) {
      this.verticalVelocity = Config.player.jumpVelocity;
      this.isGrounded = false;
    }
    this.#jumpQueued = false;

    let nextFeet = feetY;
    const ground = physics.groundHeightAt(this.position.x, this.position.z);
    if (this.isGrounded && feetY > ground + 0.06) this.isGrounded = false;
    if (!this.isGrounded || this.verticalVelocity > 0) {
      this.verticalVelocity -= Config.physics.gravity * dt;
      nextFeet += this.verticalVelocity * dt;
    }

    if (nextFeet <= ground) {
      nextFeet = ground;
      this.verticalVelocity = 0;
      this.isGrounded = true;
    }

    // Query from the swept lower position so a large upward step cannot tunnel
    // through a thin roof between frames.
    const ceiling = physics.ceilingHeightAt(this.position, Config.player.radius, Math.min(feetY, nextFeet));
    if (nextFeet + this.#height > ceiling) {
      nextFeet = Math.max(ground, ceiling - this.#height);
      if (this.verticalVelocity > 0) this.verticalVelocity = 0;
    }
    this.position.y = nextFeet + this.#height;
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
    return this.hp <= 0;
  }

  reset() {
    this.hp = Config.player.maxHP;
    this.yaw = 0;
    this.pitch = 0;
    this.#height = Config.player.height;
    this.verticalVelocity = 0;
    this.isGrounded = true;
    this.isCrouching = false;
    this.#jumpQueued = false;
    this.position.set(0, Config.player.height, 0);
  }

  clampToBounds() {
    const bound = Config.arena.size / 2 - 1;
    this.position.x = Math.max(-bound, Math.min(bound, this.position.x));
    this.position.z = Math.max(-bound, Math.min(bound, this.position.z));
  }
}
