import * as THREE from 'three';
import { Config } from '../Config.js';

/**
 * Player — owns first-person camera movement, health, and input state.
 * Supports both keyboard/mouse and touch controls.
 */
export class Player {
  hp = Config.player.maxHP;
  yaw = 0;
  pitch = 0;
  #keys = {};

  constructor(camera) {
    this.camera = camera;
    this.#bindInput();
  }

  get position() { return this.camera.position; }
  get isMoving() {
    return !!(this.#keys['KeyW'] || this.#keys['KeyS'] || this.#keys['KeyA'] || this.#keys['KeyD']);
  }

  #bindInput() {
    document.addEventListener('keydown', e => { this.#keys[e.code] = true; });
    document.addEventListener('keyup',   e => { this.#keys[e.code] = false; });
    document.addEventListener('mousemove', e => this.#onMouseMove(e));
  }

  #onMouseMove(e) {
    this.yaw   -= e.movementX * 0.002;
    this.pitch  -= e.movementY * 0.002;
    this.pitch  = Math.max(-Math.PI/2 + 0.05, Math.min(Math.PI/2 - 0.05, this.pitch));
  }

  wantsReload() { return !!this.#keys['KeyR']; }

  update(dt, speedMultiplier = 1) {
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    const right   = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
    const sprint  = this.#keys['ShiftLeft'] || this.#keys['ShiftRight'];
    const speed   = Config.player.speed * (sprint ? Config.player.sprintMultiplier : 1) * speedMultiplier;

    const moveDir = new THREE.Vector3();
    if (this.#keys['KeyW']) moveDir.add(forward);
    if (this.#keys['KeyS']) moveDir.sub(forward);
    if (this.#keys['KeyD']) moveDir.add(right);
    if (this.#keys['KeyA']) moveDir.sub(right);
    if (moveDir.length() > 0) moveDir.normalize();

    this.position.x += moveDir.x * speed * dt;
    this.position.z += moveDir.z * speed * dt;

    return moveDir;
  }

  /** Touch control update — joystick movement + look deltas. */
  updateFromTouch(dt, moveX, moveY, lookDX, lookDY, speedMultiplier = 1) {
    // Look
    this.yaw -= lookDX * 0.005;
    this.pitch -= lookDY * 0.005;
    this.pitch = Math.max(-Math.PI/2 + 0.05, Math.min(Math.PI/2 - 0.05, this.pitch));

    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    // Movement from joystick
    if (Math.abs(moveX) > 0.05 || Math.abs(moveY) > 0.05) {
      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
      const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
      const speed = Config.player.speed * speedMultiplier;

      // moveX is left-right, moveY is forward-back (inverted: up on stick = forward = -Y)
      const moveDir = new THREE.Vector3();
      moveDir.add(right.multiplyScalar(moveX));
      moveDir.add(forward.multiplyScalar(-moveY));
      if (moveDir.length() > 1) moveDir.normalize();

      this.position.x += moveDir.x * speed * dt;
      this.position.z += moveDir.z * speed * dt;
    }
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
    this.position.set(0, Config.player.height, 0);
  }

  clampToBounds() {
    const bound = Config.arena.size / 2 - 1;
    this.position.x = Math.max(-bound, Math.min(bound, this.position.x));
    this.position.z = Math.max(-bound, Math.min(bound, this.position.z));
    this.position.y = Config.player.height;
  }
}
