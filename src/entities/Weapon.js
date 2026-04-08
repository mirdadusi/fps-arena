import * as THREE from 'three';
import { Config } from '../Config.js';

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
    for (const key of WEAPON_KEYS) {
      this.#ammo[key] = WEAPON_DEFS[key].maxAmmo;
      this.#models[key] = this.#buildModel(key);
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

  static get KEYS() { return WEAPON_KEYS; }

  switchTo(index) {
    if (index === this.#currentIndex || index < 0 || index >= WEAPON_KEYS.length) return;
    if (this.#switching) return;
    this.reloading = false;
    this.#switching = true;
    this.#switchTimer = this.#switchDuration;
    this.#models[this.currentKey].visible = false;
    this.#currentIndex = index;
    this.#models[this.currentKey].visible = true;
    this.fireCooldown = 0;
  }

  scrollWeapon(delta) {
    let next = this.#currentIndex + (delta > 0 ? 1 : -1);
    if (next < 0) next = WEAPON_KEYS.length - 1;
    if (next >= WEAPON_KEYS.length) next = 0;
    this.switchTo(next);
  }

  #buildModel(key) {
    const g = new THREE.Group();
    const dark = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.3 });
    const accent = new THREE.MeshStandardMaterial({ color: WEAPON_DEFS[key].bulletColor, metalness: 0.6, roughness: 0.4 });
    const grip = new THREE.MeshStandardMaterial({ color: 0x333322, roughness: 0.7 });

    const add = (geo, mat, pos, rot) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(...pos);
      if (rot) m.rotation.set(...rot);
      g.add(m);
      return m;
    };

    if (key === 'rifle') {
      add(new THREE.BoxGeometry(0.12, 0.14, 0.6), dark, [0, -0.05, -0.2]);
      add(new THREE.CylinderGeometry(0.025, 0.03, 0.35, 8), dark, [0, 0, -0.55], [Math.PI / 2, 0, 0]);
      add(new THREE.BoxGeometry(0.08, 0.2, 0.1), grip, [0, -0.17, -0.05], [-0.2, 0, 0]);
    } else if (key === 'shotgun') {
      add(new THREE.BoxGeometry(0.14, 0.12, 0.7), dark, [0, -0.05, -0.25]);
      add(new THREE.CylinderGeometry(0.035, 0.035, 0.4, 8), dark, [0, 0.02, -0.6], [Math.PI / 2, 0, 0]);
      add(new THREE.CylinderGeometry(0.035, 0.035, 0.4, 8), dark, [0, -0.02, -0.6], [Math.PI / 2, 0, 0]);
      add(new THREE.BoxGeometry(0.1, 0.22, 0.12), grip, [0, -0.18, 0.05], [-0.25, 0, 0]);
      add(new THREE.BoxGeometry(0.12, 0.06, 0.25), accent, [0, -0.12, -0.1]);
    } else if (key === 'sniper') {
      add(new THREE.BoxGeometry(0.09, 0.1, 0.8), dark, [0, -0.05, -0.3]);
      add(new THREE.CylinderGeometry(0.02, 0.025, 0.5, 8), dark, [0, 0, -0.7], [Math.PI / 2, 0, 0]);
      add(new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8), accent, [0, 0.08, -0.25]);
      add(new THREE.BoxGeometry(0.07, 0.2, 0.1), grip, [0, -0.17, 0.05], [-0.2, 0, 0]);
    } else if (key === 'rocket') {
      add(new THREE.CylinderGeometry(0.06, 0.06, 0.7, 8), dark, [0, 0, -0.3], [Math.PI / 2, 0, 0]);
      add(new THREE.CylinderGeometry(0.07, 0.065, 0.1, 8), accent, [0, 0, -0.65], [Math.PI / 2, 0, 0]);
      add(new THREE.BoxGeometry(0.1, 0.2, 0.12), grip, [0, -0.14, 0.0], [-0.2, 0, 0]);
      add(new THREE.BoxGeometry(0.04, 0.08, 0.15), dark, [0, 0.08, -0.15]);
    }
    return g;
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
  }

  tryFire() {
    if (this.reloading || this.fireCooldown > 0 || this.#switching) return false;
    if (this.ammo <= 0) { this.startReload(); return false; }

    this.ammo--;
    this.fireCooldown = this.currentDef.fireRate;
    this.#kick = this.currentKey === 'shotgun' ? 2 : this.currentKey === 'rocket' ? 1.5 : 1;
    this.#muzzleFlash.intensity = 15;
    this.#muzzleMesh.visible = true;

    if (this.ammo <= 0) this.startReload();
    return true;
  }

  startReload() {
    if (this.reloading || this.ammo >= this.currentDef.maxAmmo || this.#switching) return;
    this.reloading = true;
    this.reloadTimer = this.currentDef.reloadTime;
  }

  reset() {
    for (const key of WEAPON_KEYS) this.#ammo[key] = WEAPON_DEFS[key].maxAmmo;
    this.#currentIndex = 0;
    for (const key of WEAPON_KEYS) this.#models[key].visible = false;
    this.#models[WEAPON_KEYS[0]].visible = true;
    this.reloading = false;
    this.fireCooldown = 0;
    this.#kick = 0;
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

    // Recoil decay
    this.#kick *= 0.85;
    this.group.rotation.x = -this.#kick * 0.15;
    this.group.position.z = -0.5 + this.#kick * 0.05;

    // Muzzle flash decay
    this.#muzzleFlash.intensity *= 0.7;
    if (this.#muzzleFlash.intensity < 0.5) {
      this.#muzzleFlash.intensity = 0;
      this.#muzzleMesh.visible = false;
    }

    // Bobbing
    const bobSpeed = isMoving ? 10 : 3;
    const bobAmount = isMoving ? 0.03 : 0.008;
    this.group.position.y = -0.28 + Math.sin(now * 0.001 * bobSpeed) * bobAmount;
    this.group.position.x = 0.3 + Math.cos(now * 0.001 * bobSpeed * 0.5) * bobAmount * 0.5;

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
}
