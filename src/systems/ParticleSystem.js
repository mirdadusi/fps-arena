import * as THREE from 'three';
import { Config } from '../Config.js';

/**
 * ParticleSystem — lightweight debris particles on impact.
 *
 * Pattern: Object Pool, managed lifecycle.
 */
export class ParticleSystem {
  #particles = [];

  constructor(scene) {
    this.scene = scene;
  }

  spawn(position, color, count = 8) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.06, 0.06),
        new THREE.MeshBasicMaterial({ color }),
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
      p.mesh.position.add(p.velocity.clone().multiplyScalar(dt));
      p.life -= dt;
      p.mesh.material.opacity = p.life;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.#particles.splice(i, 1);
      }
    }
  }
}
