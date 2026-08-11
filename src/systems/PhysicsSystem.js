import * as THREE from 'three';

/**
 * PhysicsSystem — AABB collision detection & resolution.
 * Stateless utility that operates on the shared collider list from Arena.
 */
export class PhysicsSystem {
  #boxes = [];
  #ray = new THREE.Ray();
  #direction = new THREE.Vector3();
  #hitPoint = new THREE.Vector3();

  #groundHeight;

  /**
   * @param {Array<{min: THREE.Vector3, max: THREE.Vector3}>} colliders
   * @param {{groundHeightAt?:(x:number,z:number)=>number}} options
   */
  constructor(colliders, options = {}) {
    this.colliders = colliders;
    this.#boxes = colliders
      .filter(box => box.blocksSight !== false)
      .map(box => new THREE.Box3(box.min, box.max));
    this.#groundHeight = options.groundHeightAt || (() => 0);
  }

  groundHeightAt(x, z) {
    const height = this.#groundHeight(x, z);
    return Number.isFinite(height) ? height : 0;
  }

  /** Check if a vertical capsule footprint overlaps an AABB. */
  checkAABB(pos, radius, feetY = -Infinity, bodyHeight = Infinity) {
    for (const box of this.colliders) {
      if (box.blocksMovement === false) continue;
      if (!this.#verticalOverlap(box, feetY, bodyHeight)) continue;
      const cx = Math.max(box.min.x, Math.min(pos.x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(pos.z, box.max.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      if (dx * dx + dz * dz < radius * radius) {
        return { box, dx, dz };
      }
    }
    return null;
  }

  /** Allocation-free broad-phase probe used by bot steering. */
  isWalkable(pos, radius, feetY = this.groundHeightAt(pos.x, pos.z), bodyHeight = 2.1) {
    for (const box of this.colliders) {
      if (box.blocksMovement === false) continue;
      if (!this.#verticalOverlap(box, feetY, bodyHeight)) continue;
      const cx = Math.max(box.min.x, Math.min(pos.x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(pos.z, box.max.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      if (dx * dx + dz * dz < radius * radius) return false;
    }
    return true;
  }

  /** Push `pos` out of all overlapping AABBs (iterative). */
  resolveCollision(pos, radius, feetY = -Infinity, bodyHeight = Infinity) {
    for (let i = 0; i < 4; i++) {
      const hit = this.checkAABB(pos, radius, feetY, bodyHeight);
      if (!hit) break;
      const { dx, dz } = hit;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 0) {
        const push = (radius - dist) / dist;
        pos.x += dx * push;
        pos.z += dz * push;
      } else {
        pos.x += radius;
      }
    }
  }

  /** True if a point sits inside any wall AABB (3D). */
  pointInsideWall(pos) {
    for (const box of this.colliders) {
      if (box.blocksMovement === false) continue;
      if (pos.x >= box.min.x && pos.x <= box.max.x &&
          pos.y >= box.min.y && pos.y <= box.max.y &&
          pos.z >= box.min.z && pos.z <= box.max.z) {
        return true;
      }
    }
    return false;
  }

  /** Lowest solid underside above the player's feet, or Infinity outdoors. */
  ceilingHeightAt(pos, radius, feetY) {
    let ceiling = Infinity;
    for (const box of this.colliders) {
      if (box.blocksMovement === false) continue;
      if (box.min.y < feetY + 0.01) continue;
      const cx = Math.max(box.min.x, Math.min(pos.x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(pos.z, box.max.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      if (dx * dx + dz * dz < radius * radius && box.min.y < ceiling) ceiling = box.min.y;
    }
    return ceiling;
  }

  canOccupy(pos, radius, feetY, bodyHeight) {
    return !this.checkAABB(pos, radius, feetY, bodyHeight);
  }

  /** Raycast line-of-sight between two points — returns true if unobstructed. */
  hasLineOfSight(from, to) {
    this.#direction.subVectors(to, from);
    const distanceSq = this.#direction.lengthSq();
    if (distanceSq <= 0.000001) return true;
    this.#direction.multiplyScalar(1 / Math.sqrt(distanceSq));
    this.#ray.set(from, this.#direction);
    for (const box of this.#boxes) {
      const hit = this.#ray.intersectBox(box, this.#hitPoint);
      if (hit && hit.distanceToSquared(from) < distanceSq - 0.0001) return false;
    }
    return true;
  }

  #verticalOverlap(box, feetY, bodyHeight) {
    if (!Number.isFinite(feetY) || !Number.isFinite(bodyHeight)) return true;
    return feetY < box.max.y - 0.001 && feetY + bodyHeight > box.min.y + 0.001;
  }
}
