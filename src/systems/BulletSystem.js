import * as THREE from 'three';
import { Config } from '../Config.js';

// Module-level material pool — one MeshBasicMaterial per unique bullet colour.
// Prevents a new material allocation on every shot.
const _matPool = new Map();

function _getOrCreateMat(color) {
  if (!_matPool.has(color)) {
    _matPool.set(color, new THREE.MeshBasicMaterial({ color }));
  }
  return _matPool.get(color);
}

/**
 * BulletSystem — object pool for bullets, movement, and hit detection.
 * Supports weapon-specific bullet speed/color.
 */
export class BulletSystem {
  #bullets = [];
  #pool = [];
  #geo = new THREE.SphereGeometry(0.08, 6, 6);
  #step = new THREE.Vector3();
  #nextPosition = new THREE.Vector3();
  #wallHit = new THREE.Vector3();
  #nearestPoint = new THREE.Vector3();

  constructor(scene, physics) {
    this.scene = scene;
    this.physics = physics;
  }

  get activeBullets() { return this.#bullets; }

  spawn(origin, direction, isEnemy, weaponDef = null) {
    const speed = weaponDef?.bulletSpeed || Config.weapon.bulletSpeed;
    const color = isEnemy ? 0xff4444 : (weaponDef?.bulletColor || 0xffcc00);
    const mat = _getOrCreateMat(color);
    const bullet = this.#pool.pop() || {
      mesh: new THREE.Mesh(this.#geo, mat),
      velocity: new THREE.Vector3(),
      previous: new THREE.Vector3(),
      isEnemy: false,
      life: 0,
      weaponDef: null,
    };
    const mesh = bullet.mesh;
    mesh.material = mat;
    mesh.position.copy(origin);
    bullet.previous.copy(origin);
    bullet.velocity.copy(direction).multiplyScalar(speed);
    bullet.isEnemy = isEnemy;
    bullet.life = 3;
    bullet.weaponDef = weaponDef;
    this.scene.add(mesh);
    this.#bullets.push(bullet);
  }

  update(dt, callbacks) {
    for (let i = this.#bullets.length - 1; i >= 0; i--) {
      const b = this.#bullets[i];
      b.previous.copy(b.mesh.position);
      this.#nextPosition.copy(b.mesh.position).addScaledVector(b.velocity, dt);
      b.life -= dt;

      if (b.life <= 0) {
        this.#remove(i);
        continue;
      }
      if (this.physics.segmentHitsSolid?.(b.previous, this.#nextPosition, this.#wallHit)) {
        b.mesh.position.copy(this.#wallHit);
        callbacks.onWallHit?.(b.mesh.position);
        this.#remove(i);
        continue;
      }
      b.mesh.position.copy(this.#nextPosition);
      if (!this.physics.segmentHitsSolid && this.physics.pointInsideWall(b.mesh.position)) {
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

  testPlayerHit(bullet, cameraPos) {
    return this.#distanceToSegmentSquared(bullet.previous, bullet.mesh.position, cameraPos) < 1.0;
  }

  testEnemyHit(bullet, enemyWorldPos) {
    this.#closestPointOnSegment(bullet.previous, bullet.mesh.position, enemyWorldPos, this.#nearestPoint);
    const dx = this.#nearestPoint.x - enemyWorldPos.x;
    const dz = this.#nearestPoint.z - enemyWorldPos.z;
    const dy = this.#nearestPoint.y - enemyWorldPos.y;
    return dx*dx + dz*dz < Config.enemy.hitRadius ** 2 && Math.abs(dy) < Config.enemy.hitHalfHeight;
  }

  clearAll() {
    for (let i = this.#bullets.length - 1; i >= 0; i--) this.#remove(i);
  }

  /** Dispose the shared geometry and all pooled materials. Call on game teardown. */
  dispose() {
    this.clearAll();
    this.#pool.length = 0;
    this.#geo.dispose();
    for (const mat of _matPool.values()) mat.dispose();
    _matPool.clear();
  }

  #remove(index) {
    const b = this.#bullets[index];
    this.scene.remove(b.mesh);
    this.#bullets.splice(index, 1);
    b.weaponDef = null;
    if (this.#pool.length < 128) this.#pool.push(b);
  }

  #closestPointOnSegment(start, end, point, out) {
    this.#step.subVectors(end, start);
    const lengthSq = this.#step.lengthSq();
    if (lengthSq <= 0.000001) return out.copy(start);
    const t = THREE.MathUtils.clamp(
      ((point.x - start.x) * this.#step.x +
       (point.y - start.y) * this.#step.y +
       (point.z - start.z) * this.#step.z) / lengthSq,
      0, 1,
    );
    return out.copy(start).addScaledVector(this.#step, t);
  }

  #distanceToSegmentSquared(start, end, point) {
    this.#closestPointOnSegment(start, end, point, this.#nearestPoint);
    return this.#nearestPoint.distanceToSquared(point);
  }
}
