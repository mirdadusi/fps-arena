import * as THREE from 'three';
import { Config } from '../Config.js';

/**
 * BulletSystem — object pool for bullets, movement, and hit detection.
 * Supports weapon-specific bullet speed/color.
 */
export class BulletSystem {
  #bullets = [];
  #geo = new THREE.SphereGeometry(0.08, 6, 6);
  #matPlayer = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
  #matEnemy  = new THREE.MeshBasicMaterial({ color: 0xff4444 });

  constructor(scene, physics) {
    this.scene = scene;
    this.physics = physics;
  }

  get activeBullets() { return this.#bullets; }

  spawn(origin, direction, isEnemy, weaponDef = null) {
    const speed = weaponDef?.bulletSpeed || Config.weapon.bulletSpeed;
    const color = isEnemy ? 0xff4444 : (weaponDef?.bulletColor || 0xffcc00);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(this.#geo, mat);
    mesh.position.copy(origin);
    mesh.add(new THREE.PointLight(color, 2, 4));
    this.scene.add(mesh);
    this.#bullets.push({
      mesh,
      velocity: direction.clone().multiplyScalar(speed),
      isEnemy,
      life: 3,
      weaponDef,
    });
  }

  update(dt, callbacks) {
    for (let i = this.#bullets.length - 1; i >= 0; i--) {
      const b = this.#bullets[i];
      b.mesh.position.add(b.velocity.clone().multiplyScalar(dt));
      b.life -= dt;

      if (b.life <= 0 || this.physics.pointInsideWall(b.mesh.position)) {
        callbacks.onWallHit?.(b.mesh.position);
        this.#remove(i);
        continue;
      }

      if (b.isEnemy) {
        if (callbacks.onPlayerHit?.(b)) {
          this.#remove(i);
          continue;
        }
      }

      if (!b.isEnemy) {
        if (callbacks.onEnemyHit?.(b)) {
          this.#remove(i);
          continue;
        }
      }
    }
  }

  testPlayerHit(bullet, cameraPos, dt) {
    const bpos = bullet.mesh.position;
    const step = bullet.velocity.clone().multiplyScalar(dt);
    const stepLen = step.length();
    const hitRadius = 1.0;

    let closest = bpos.distanceTo(cameraPos);
    if (stepLen > 0.001) {
      const dir = step.clone().normalize();
      const toCam = new THREE.Vector3().subVectors(cameraPos, bpos);
      const t = Math.max(0, Math.min(stepLen, toCam.dot(dir)));
      const nearestPt = bpos.clone().add(dir.multiplyScalar(t));
      closest = nearestPt.distanceTo(cameraPos);
    }
    return closest < hitRadius;
  }

  testEnemyHit(bullet, enemyWorldPos) {
    const bpos = bullet.mesh.position;
    const dx = bpos.x - enemyWorldPos.x;
    const dz = bpos.z - enemyWorldPos.z;
    const dy = bpos.y - enemyWorldPos.y;
    return dx*dx + dz*dz < Config.enemy.hitRadius ** 2 && Math.abs(dy) < Config.enemy.hitHalfHeight;
  }

  clearAll() {
    for (let i = this.#bullets.length - 1; i >= 0; i--) this.#remove(i);
  }

  #remove(index) {
    const b = this.#bullets[index];
    this.scene.remove(b.mesh);
    this.#bullets.splice(index, 1);
  }
}
