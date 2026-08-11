import * as THREE from 'three';
import { Config } from '../Config.js';

// Single shared geometry — all particle meshes reuse this one instance
// instead of allocating a new BoxGeometry per particle.
const _sharedGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);

/**
 * ParticleSystem — lightweight debris particles on impact.
 *
 * Pattern: Object Pool, managed lifecycle.
 * Each particle gets its own MeshBasicMaterial (needed for per-particle
 * opacity fade), but the geometry is shared to prevent GPU-buffer leaks.
 * Materials are disposed individually when their particle expires.
 */
export class ParticleSystem {
  #particles = [];

  constructor(scene) {
    this.scene = scene;
  }

  spawn(position, color, count = 8) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(
        _sharedGeo,
        new THREE.MeshBasicMaterial({ color, transparent: true }),
      );
      mesh.position.copy(position);
      this.scene.add(mesh);
      this.#particles.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 8,
        ),
        life: 0.6 + Math.random() * 0.4,
      });
    }
  }

  update(dt) {
    for (let i = this.#particles.length - 1; i >= 0; i--) {
      const p = this.#particles[i];
      p.velocity.y -= Config.physics.gravity * dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.life -= dt;
      p.mesh.material.opacity = p.life;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.material.dispose();
        this.#particles.splice(i, 1);
      }
    }
  }

  /** Dispose all active particles and free their materials. Call on game teardown. */
  dispose() {
    for (const p of this.#particles) {
      this.scene.remove(p.mesh);
      p.mesh.material.dispose();
    }
    this.#particles.length = 0;
    _sharedGeo.dispose();
  }
}
