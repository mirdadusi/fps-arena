import * as THREE from 'three';

const PICKUP_DEFS = {
  health: { name: 'Health Pack', color: 0x44ff44, glow: 0x00ff00, value: 50, respawn: 15, duration: 0, css: '#4f4' },
  ammo:   { name: 'Ammo Crate',  color: 0xffcc00, glow: 0xffaa00, value: 30, respawn: 10, duration: 0, css: '#fc0' },
  shield: { name: 'Shield',      color: 0x4488ff, glow: 0x2266ff, value: 0.5, respawn: 20, duration: 10, css: '#48f' },
  speed:  { name: 'Speed Boost', color: 0xff44ff, glow: 0xff00ff, value: 1.5, respawn: 20, duration: 8, css: '#f4f' },
  damage: { name: 'Double Damage', color: 0xff4444, glow: 0xff0000, value: 2.0, respawn: 25, duration: 10, css: '#f44' },
};

export { PICKUP_DEFS };

/**
 * PickupSystem — manages floating collectible items in the arena.
 * Handles spawning, animation, collection, active powerup effects, and respawning.
 */
export class PickupSystem {
  #scene;
  #pickups = [];
  #activeEffects = [];

  constructor(scene) {
    this.#scene = scene;
  }

  get activeEffects() { return this.#activeEffects; }
  get pickups() { return this.#pickups; }

  getSpeedMultiplier()  { return this.#activeEffects.some(e => e.type === 'speed')  ? 1.5 : 1; }
  getDamageMultiplier() { return this.#activeEffects.some(e => e.type === 'damage') ? 2.0 : 1; }
  getShieldMultiplier() { return this.#activeEffects.some(e => e.type === 'shield') ? 0.5 : 1; }

  spawnFromLayout(spots) {
    this.clearAll();
    spots.forEach((spot, i) => {
      const def = PICKUP_DEFS[spot.type];
      if (!def) return;

      const group = new THREE.Group();
      group.position.set(spot.x, 0.8, spot.z);

      const mesh = this.#createMesh(spot.type, def);
      group.add(mesh);

      const light = new THREE.PointLight(def.glow, 3, 6);
      light.position.y = 0.2;
      group.add(light);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.7, 16),
        new THREE.MeshBasicMaterial({ color: def.glow, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -0.75;
      group.add(ring);

      this.#scene.add(group);
      this.#pickups.push({ id: i, type: spot.type, def, group, mesh, light, ring, active: true, respawnTimer: 0, spot });
    });
  }

  #createMesh(type, def) {
    const emMat = (c) => new THREE.MeshStandardMaterial({ color: c, metalness: 0.5, roughness: 0.3, emissive: c, emissiveIntensity: 0.3 });
    switch (type) {
      case 'health': {
        const g = new THREE.Group();
        const m = emMat(def.color);
        g.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.15), m));
        g.add(new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 0.15), m));
        return g;
      }
      case 'ammo':
        return new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), emMat(def.color));
      case 'shield': {
        const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), emMat(def.color));
        m.scale.y = 1.3;
        return m;
      }
      case 'speed':
        return new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.5, 6), emMat(def.color));
      case 'damage':
        return new THREE.Mesh(new THREE.OctahedronGeometry(0.3),
          new THREE.MeshStandardMaterial({ color: def.color, metalness: 0.7, roughness: 0.2, emissive: def.color, emissiveIntensity: 0.4 }));
      default:
        return new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), emMat(def.color));
    }
  }

  update(dt, playerPos, onCollect) {
    const now = performance.now() * 0.001;

    for (const p of this.#pickups) {
      if (p.active) {
        p.group.rotation.y = now * 1.5;
        p.group.position.y = 0.8 + Math.sin(now * 2 + p.id) * 0.15;
        p.light.intensity = 2.5 + Math.sin(now * 3 + p.id * 0.7);
        p.ring.material.opacity = 0.3 + Math.sin(now * 2 + p.id) * 0.15;

        const dx = playerPos.x - p.spot.x;
        const dz = playerPos.z - p.spot.z;
        if (dx * dx + dz * dz < 2.25) {
          this.collect(p.id);
          onCollect?.(p);
        }
      } else {
        p.respawnTimer -= dt;
        if (p.respawnTimer <= 0) {
          p.active = true;
          p.group.visible = true;
        }
      }
    }

    for (let i = this.#activeEffects.length - 1; i >= 0; i--) {
      this.#activeEffects[i].remaining -= dt;
      if (this.#activeEffects[i].remaining <= 0) this.#activeEffects.splice(i, 1);
    }
  }

  collect(id) {
    const p = this.#pickups.find(pk => pk.id === id);
    if (!p || !p.active) return null;
    p.active = false;
    p.group.visible = false;
    p.respawnTimer = p.def.respawn;
    if (p.def.duration > 0) {
      this.#activeEffects = this.#activeEffects.filter(e => e.type !== p.type);
      this.#activeEffects.push({ type: p.type, name: p.def.name, remaining: p.def.duration, total: p.def.duration, css: p.def.css });
    }
    return p;
  }

  getPickupPositions() {
    return this.#pickups.filter(p => p.active).map(p => ({
      x: p.spot.x, z: p.spot.z,
      color: p.def.css,
    }));
  }

  clearAll() {
    for (const p of this.#pickups) this.#scene.remove(p.group);
    this.#pickups = [];
    this.#activeEffects = [];
  }

  reset() {
    for (const p of this.#pickups) { p.active = true; p.group.visible = true; p.respawnTimer = 0; }
    this.#activeEffects = [];
  }
}
