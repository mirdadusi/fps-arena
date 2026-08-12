import * as THREE from 'three';
import { Config } from '../Config.js';

const POOL_SIZE = 96;
const INITIAL_COLORS = [
  0xff0000, 0xff4444, 0xff6600, 0xffaa44,
  0x44ff44, 0xffcc00, 0x4488ff, 0xff44ff,
];

/**
 * ParticleSystem — lightweight debris particles on impact.
 *
 * Pattern: Object Pool, managed lifecycle.
 * Meshes and vectors are preallocated. Materials are shared by colour and
 * particles shrink instead of changing per-mesh opacity, so collection never
 * creates GPU resources in the gameplay frame.
 */
export class ParticleSystem {
  #particles = [];
  #pool = [];
  #geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
  #materials = new Map();

  constructor(scene) {
    this.scene = scene;
    for (const color of INITIAL_COLORS) this.#getMaterial(color);
    const initialMaterial = this.#materials.get(INITIAL_COLORS[0]);
    for (let i = 0; i < POOL_SIZE; i++) {
      const mesh = new THREE.Mesh(this.#geometry, initialMaterial);
      mesh.visible = false;
      this.#pool.push({ mesh, velocity: new THREE.Vector3(), life: 0, maxLife: 1 });
    }
  }

  get activeCount() { return this.#particles.length; }
  get pooledCount() { return this.#pool.length; }
  get materialCount() { return this.#materials.size; }

  spawn(position, color, count = 8) {
    const material = this.#getMaterial(color);
    const available = Math.min(count, this.#pool.length);
    for (let i = 0; i < available; i++) {
      const particle = this.#pool.pop();
      const mesh = particle.mesh;
      mesh.material = material;
      mesh.position.copy(position);
      mesh.scale.setScalar(1);
      mesh.visible = true;
      this.scene.add(mesh);
      particle.velocity.set(
        (Math.random() - 0.5) * 8,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 8,
      );
      particle.life = 0.6 + Math.random() * 0.4;
      particle.maxLife = particle.life;
      this.#particles.push(particle);
    }
  }

  /** Compile particle geometry/materials during match setup, not collection. */
  warm(renderer, camera) {
    if (!renderer?.compile || !camera) return;
    const samples = [];
    for (const material of this.#materials.values()) {
      const particle = this.#pool.pop();
      if (!particle) break;
      particle.mesh.material = material;
      particle.mesh.position.set(0, -1000, 0);
      particle.mesh.visible = true;
      particle.mesh.frustumCulled = false;
      this.scene.add(particle.mesh);
      samples.push(particle);
    }
    try {
      renderer.compile(this.scene, camera);
    } finally {
      for (const particle of samples) {
        this.scene.remove(particle.mesh);
        particle.mesh.visible = false;
        particle.mesh.frustumCulled = true;
        this.#pool.push(particle);
      }
    }
  }

  update(dt) {
    for (let i = this.#particles.length - 1; i >= 0; i--) {
      const p = this.#particles[i];
      p.velocity.y -= Config.physics.gravity * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.life -= dt;
      p.mesh.scale.setScalar(Math.max(0.05, p.life / p.maxLife));
      if (p.life <= 0) {
        this.#release(i);
      }
    }
  }

  #getMaterial(color) {
    if (!this.#materials.has(color)) {
      this.#materials.set(color, new THREE.MeshBasicMaterial({ color }));
    }
    return this.#materials.get(color);
  }

  #release(index) {
    const particle = this.#particles[index];
    this.scene.remove(particle.mesh);
    particle.mesh.visible = false;
    const last = this.#particles.pop();
    if (index < this.#particles.length) this.#particles[index] = last;
    this.#pool.push(particle);
  }

  /** Dispose all active particles and free their materials. Call on game teardown. */
  dispose() {
    for (let i = this.#particles.length - 1; i >= 0; i--) this.#release(i);
    this.#pool.length = 0;
    this.#geometry.dispose();
    for (const material of this.#materials.values()) material.dispose();
    this.#materials.clear();
  }
}
