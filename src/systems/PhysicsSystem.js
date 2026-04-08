import * as THREE from 'three';

/**
 * PhysicsSystem — AABB collision detection & resolution.
 * Stateless utility that operates on the shared collider list from Arena.
 */
export class PhysicsSystem {
  /** @param {Array<{min: THREE.Vector3, max: THREE.Vector3}>} colliders */
  constructor(colliders) {
    this.colliders = colliders;
  }

  /** Check if a circle (pos, radius) overlaps any AABB on the XZ plane. */
  checkAABB(pos, radius) {
    for (const box of this.colliders) {
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

  /** Push `pos` out of all overlapping AABBs (iterative). */
  resolveCollision(pos, radius) {
    for (let i = 0; i < 4; i++) {
      const hit = this.checkAABB(pos, radius);
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
      if (pos.x >= box.min.x && pos.x <= box.max.x &&
          pos.y >= box.min.y && pos.y <= box.max.y &&
          pos.z >= box.min.z && pos.z <= box.max.z) {
        return true;
      }
    }
    return false;
  }

  /** Raycast line-of-sight between two points — returns true if unobstructed. */
  hasLineOfSight(from, to) {
    const dir = new THREE.Vector3().subVectors(to, from).normalize();
    const ray = new THREE.Raycaster(from.clone(), dir);
    const dist = from.distanceTo(to);
    for (const box of this.colliders) {
      const b3 = new THREE.Box3(box.min, box.max);
      if (ray.ray.intersectsBox(b3)) {
        const hit = ray.ray.intersectBox(b3, new THREE.Vector3());
        if (hit && hit.distanceTo(from) < dist) return false;
      }
    }
    return true;
  }
}
