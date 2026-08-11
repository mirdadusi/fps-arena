import * as THREE from 'three';
import { Config } from '../Config.js';
import { disposeObject3D } from '../rendering/disposeObject3D.js';
import { createWeaponModel } from './weapon/WeaponModelFactory.js';

const WEAPON_KEYS = Object.keys(Config.weapons);
const WEAPON_DEFS = Config.weapons;

/**
 * Weapon — multi-weapon system with switching.
 * Supports rifle, shotgun, sniper, and rocket launcher.
 */
export class Weapon {
  group = new THREE.Group();
  reloading = false;
  reloadTimer = 0;
  fireCooldown = 0;
  #kick = 0;
  #recoilVelocity = 0;
  #aiming = false;
  #baseFOV;
  #camera;

  // Weapon slots
  #currentIndex = 0;
  #models = {};
  #ammo = {};

  // Visual sub-parts
  #muzzleFlash;
  #muzzleMesh;

  // Switch animation
  #switching = false;
  #switchTimer = 0;
  #switchDuration = 0.3;

  constructor(camera) {
    this.#camera = camera;
    this.#baseFOV = camera.fov;
    for (const key of WEAPON_KEYS) {
      this.#ammo[key] = WEAPON_DEFS[key].maxAmmo;
      this.#models[key] = createWeaponModel(key);
      this.#models[key].visible = false;
      this.group.add(this.#models[key]);
    }
    this.#models[WEAPON_KEYS[0]].visible = true;
    this.#buildMuzzleFlash();
    this.group.position.set(0.3, -0.28, -0.5);
    camera.add(this.group);
  }

  get currentKey()  { return WEAPON_KEYS[this.#currentIndex]; }
  get currentDef()  { return WEAPON_DEFS[this.currentKey]; }
  get ammo()        { return this.#ammo[this.currentKey]; }
  set ammo(v)       { this.#ammo[this.currentKey] = v; }
  get weaponIndex() { return this.#currentIndex; }
  get weaponName()  { return this.currentDef.name; }
  get isSwitching() { return this.#switching; }
  get aiming()      { return this.#aiming; }

  static get KEYS() { return WEAPON_KEYS; }

  switchTo(index) {
    if (index === this.#currentIndex || index < 0 || index >= WEAPON_KEYS.length) return;
    if (this.#switching) return;
    this.reloading = false;
    this.setAiming(false);
    this.#switching = true;
    this.#switchTimer = this.#switchDuration;
    this.#models[this.currentKey].visible = false;
    this.#currentIndex = index;
    this.#models[this.currentKey].visible = true;
    this.#muzzleFlash.position.z = this.#models[this.currentKey].userData.muzzleZ;
    this.#muzzleMesh.position.copy(this.#muzzleFlash.position);
    this.fireCooldown = 0;
  }

  scrollWeapon(delta) {
    let next = this.#currentIndex + (delta > 0 ? 1 : -1);
    if (next < 0) next = WEAPON_KEYS.length - 1;
    if (next >= WEAPON_KEYS.length) next = 0;
    this.switchTo(next);
  }

  #buildMuzzleFlash() {
    this.#muzzleFlash = new THREE.PointLight(0xffaa00, 0, 8);
    this.#muzzleFlash.position.set(0, 0, -0.75);
    this.group.add(this.#muzzleFlash);

    this.#muzzleMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xffcc44 }),
    );
    this.#muzzleMesh.position.copy(this.#muzzleFlash.position);
    this.#muzzleMesh.visible = false;
    this.group.add(this.#muzzleMesh);
    this.#muzzleFlash.position.z = this.#models[this.currentKey].userData.muzzleZ;
    this.#muzzleMesh.position.copy(this.#muzzleFlash.position);
  }

  tryFire() {
    if (this.reloading || this.fireCooldown > 0 || this.#switching) return false;
    if (this.ammo <= 0) { this.startReload(); return false; }

    this.ammo--;
    this.fireCooldown = this.currentDef.fireRate;
    this.#recoilVelocity += this.currentDef.recoil;
    this.#muzzleFlash.intensity = 15;
    this.#muzzleMesh.visible = true;

    if (this.ammo <= 0) this.startReload();
    return true;
  }

  startReload() {
    if (this.reloading || this.ammo >= this.currentDef.maxAmmo || this.#switching) return;
    this.setAiming(false);
    this.reloading = true;
    this.reloadTimer = this.currentDef.reloadTime;
  }

  setAiming(value) {
    this.#aiming = !!value && !this.reloading && !this.#switching;
    document.body.classList.toggle('weapon-aiming', this.#aiming);
  }

  reset() {
    for (const key of WEAPON_KEYS) this.#ammo[key] = WEAPON_DEFS[key].maxAmmo;
    this.#currentIndex = 0;
    for (const key of WEAPON_KEYS) this.#models[key].visible = false;
    this.#models[WEAPON_KEYS[0]].visible = true;
    this.reloading = false;
    this.fireCooldown = 0;
    this.#kick = 0;
    this.#recoilVelocity = 0;
    this.setAiming(false);
    this.#switching = false;
    this.group.rotation.z = 0;
  }

  update(dt, now, isMoving) {
    this.fireCooldown = Math.max(0, this.fireCooldown - dt);

    // Switch animation
    if (this.#switching) {
      this.#switchTimer -= dt;
      const t = this.#switchTimer / this.#switchDuration;
      this.group.position.y = -0.28 - (1 - Math.abs(t * 2 - 1)) * 0.3;
      if (this.#switchTimer <= 0) {
        this.#switching = false;
        this.group.position.y = -0.28;
      }
      return false;
    }

    // Frame-rate-independent recoil spring.
    this.#recoilVelocity -= this.#kick * Config.weaponFeel.recoilSpring * dt;
    this.#recoilVelocity *= Math.exp(-Config.weaponFeel.recoilDamping * dt);
    this.#kick = Math.max(0, this.#kick + this.#recoilVelocity * dt);
    this.group.rotation.x = -this.#kick * 0.12;

    // Muzzle flash decay
    this.#muzzleFlash.intensity *= 0.7;
    if (this.#muzzleFlash.intensity < 0.5) {
      this.#muzzleFlash.intensity = 0;
      this.#muzzleMesh.visible = false;
    }

    // Bobbing
    const bobSpeed = isMoving ? 10 : 3;
    const bobAmount = isMoving ? 0.03 : 0.008;
    const aiming = this.#aiming && !this.reloading;
    const response = 1 - Math.exp(-Config.weaponFeel.aimResponse * dt);
    const bobScale = aiming ? 0.25 : 1;
    const targetX = (aiming ? 0 : 0.3) + Math.cos(now * 0.001 * bobSpeed * 0.5) * bobAmount * 0.5 * bobScale;
    const targetY = (aiming ? -0.16 : -0.28) + Math.sin(now * 0.001 * bobSpeed) * bobAmount * bobScale;
    const targetZ = (aiming ? -0.42 : -0.5) + this.#kick * 0.04;
    this.group.position.x += (targetX - this.group.position.x) * response;
    this.group.position.y += (targetY - this.group.position.y) * response;
    this.group.position.z += (targetZ - this.group.position.z) * response;

    const targetFOV = aiming ? this.#baseFOV * this.currentDef.adsFovMultiplier : this.#baseFOV;
    if (Math.abs(this.#camera.fov - targetFOV) > 0.01) {
      this.#camera.fov += (targetFOV - this.#camera.fov) * response;
      this.#camera.updateProjectionMatrix();
    }

    // Reload
    if (this.reloading) {
      this.reloadTimer -= dt;
      this.group.rotation.z = Math.sin(this.reloadTimer * 4) * 0.3;
      if (this.reloadTimer <= 0) {
        this.reloading = false;
        this.ammo = this.currentDef.maxAmmo;
        this.group.rotation.z = 0;
        return true;
      }
    }
    return false;
  }

  destroy() {
    this.setAiming(false);
    this.#camera.fov = this.#baseFOV;
    this.#camera.updateProjectionMatrix();
    this.#camera.remove(this.group);
    disposeObject3D(this.group);
    this.group.clear();
  }
}
