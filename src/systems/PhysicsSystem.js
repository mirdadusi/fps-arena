import * as THREE from 'three';

/**
 * PhysicsSystem — AABB collision detection & resolution.
 * Stateless utility that operates on the shared collider list from Arena.
 */
export class PhysicsSystem {
  #boxes = [];
  #movementGrid = new Map();
  #sightGrid = new Map();
  #candidates = [];
  #candidateSet = new Set();
  #cellSize = 6;
  #ray = new THREE.Ray();
  #direction = new THREE.Vector3();
  #hitPoint = new THREE.Vector3();
  #nearestHitPoint = new THREE.Vector3();
  #hitResult = { box: null, dx: 0, dz: 0 };

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
    for (const box of colliders) {
      if (box.blocksMovement !== false) this.#index(this.#movementGrid, box);
    }
    for (const box of this.#boxes) this.#index(this.#sightGrid, box);
    this.#groundHeight = options.groundHeightAt || (() => 0);
  }

  groundHeightAt(x, z) {
    const height = this.#groundHeight(x, z);
    return Number.isFinite(height) ? height : 0;
  }

  /** Check if a vertical capsule footprint overlaps an AABB. */
  checkAABB(pos, radius, feetY = -Infinity, bodyHeight = Infinity) {
    const candidates = this.#query(
      this.#movementGrid,
      pos.x - radius, pos.x + radius,
      pos.z - radius, pos.z + radius,
    );
    for (const box of candidates) {
      if (!this.#verticalOverlap(box, feetY, bodyHeight)) continue;
      const cx = Math.max(box.min.x, Math.min(pos.x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(pos.z, box.max.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      if (dx * dx + dz * dz < radius * radius) {
        // Shared result: collision queries are consumed synchronously and this
        // keeps bot steering from generating garbage every frame.
        this.#hitResult.box = box;
        this.#hitResult.dx = dx;
        this.#hitResult.dz = dz;
        return this.#hitResult;
      }
    }
    return null;
  }

  /** Allocation-free broad-phase probe used by bot steering. */
  isWalkable(pos, radius, feetY = this.groundHeightAt(pos.x, pos.z), bodyHeight = 2.1) {
    const candidates = this.#query(
      this.#movementGrid,
      pos.x - radius, pos.x + radius,
      pos.z - radius, pos.z + radius,
    );
    for (const box of candidates) {
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
        // The capsule centre is inside the AABB. Moving an arbitrary +radius
        // can leave it embedded in a wide wall; select the nearest face of the
        // radius-expanded box instead.
        const box = hit.box;
        const left = pos.x - (box.min.x - radius);
        const right = (box.max.x + radius) - pos.x;
        const near = pos.z - (box.min.z - radius);
        const far = (box.max.z + radius) - pos.z;
        const nearest = Math.min(left, right, near, far);
        if (nearest === left) pos.x = box.min.x - radius;
        else if (nearest === right) pos.x = box.max.x + radius;
        else if (nearest === near) pos.z = box.min.z - radius;
        else pos.z = box.max.z + radius;
      }
    }
  }

  /**
   * Move a capsule over a horizontal segment without tunnelling through thin
   * colliders. Large frame deltas are split into radius-sized steps, while
   * collision resolution on each step preserves natural wall sliding.
   */
  moveWithCollisions(pos, deltaX, deltaZ, radius, feetY = -Infinity, bodyHeight = Infinity) {
    const distance = Math.hypot(deltaX, deltaZ);
    if (distance <= 0.000001) return;

    const maxStep = Math.max(0.1, radius * 0.45);
    const steps = Math.min(24, Math.max(1, Math.ceil(distance / maxStep)));
    const stepX = deltaX / steps;
    const stepZ = deltaZ / steps;
    for (let i = 0; i < steps; i++) {
      pos.x += stepX;
      pos.z += stepZ;
      this.resolveCollision(pos, radius, feetY, bodyHeight);
    }
  }

  /** True if a point sits inside any wall AABB (3D). */
  pointInsideWall(pos) {
    const candidates = this.#query(this.#movementGrid, pos.x, pos.x, pos.z, pos.z);
    for (const box of candidates) {
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
    const candidates = this.#query(
      this.#movementGrid,
      pos.x - radius, pos.x + radius,
      pos.z - radius, pos.z + radius,
    );
    for (const box of candidates) {
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
    const boxes = this.#query(
      this.#sightGrid,
      Math.min(from.x, to.x), Math.max(from.x, to.x),
      Math.min(from.z, to.z), Math.max(from.z, to.z),
    );
    for (const box of boxes) {
      const hit = this.#ray.intersectBox(box, this.#hitPoint);
      if (hit && hit.distanceToSquared(from) < distanceSq - 0.0001) return false;
    }
    return true;
  }

  /** Find the first solid wall crossed by a segment. */
  segmentHitsSolid(from, to, hitOut = null) {
    this.#direction.subVectors(to, from);
    const distance = this.#direction.length();
    if (distance <= 0.000001) return false;
    this.#direction.multiplyScalar(1 / distance);
    this.#ray.set(from, this.#direction);
    const boxes = this.#query(
      this.#movementGrid,
      Math.min(from.x, to.x), Math.max(from.x, to.x),
      Math.min(from.z, to.z), Math.max(from.z, to.z),
    );
    let nearestDistanceSq = Infinity;
    for (const box of boxes) {
      const hit = this.#ray.intersectBox(box, this.#hitPoint);
      if (!hit) continue;
      const hitDistanceSq = hit.distanceToSquared(from);
      if (hitDistanceSq > distance * distance + 0.0001 || hitDistanceSq >= nearestDistanceSq) continue;
      nearestDistanceSq = hitDistanceSq;
      this.#nearestHitPoint.copy(hit);
    }
    if (!Number.isFinite(nearestDistanceSq)) return false;
    hitOut?.copy(this.#nearestHitPoint);
    return true;
  }

  #verticalOverlap(box, feetY, bodyHeight) {
    if (!Number.isFinite(feetY) || !Number.isFinite(bodyHeight)) return true;
    return feetY < box.max.y - 0.001 && feetY + bodyHeight > box.min.y + 0.001;
  }

  #index(grid, box) {
    const minCellX = Math.floor(box.min.x / this.#cellSize);
    const maxCellX = Math.floor(box.max.x / this.#cellSize);
    const minCellZ = Math.floor(box.min.z / this.#cellSize);
    const maxCellZ = Math.floor(box.max.z / this.#cellSize);
    for (let x = minCellX; x <= maxCellX; x++) {
      for (let z = minCellZ; z <= maxCellZ; z++) {
        const key = this.#cellKey(x, z);
        let bucket = grid.get(key);
        if (!bucket) {
          bucket = [];
          grid.set(key, bucket);
        }
        bucket.push(box);
      }
    }
  }

  /** Spatial-hash lookup reusing both the output array and de-duplication set. */
  #query(grid, minX, maxX, minZ, maxZ) {
    this.#candidates.length = 0;
    this.#candidateSet.clear();
    const minCellX = Math.floor(minX / this.#cellSize);
    const maxCellX = Math.floor(maxX / this.#cellSize);
    const minCellZ = Math.floor(minZ / this.#cellSize);
    const maxCellZ = Math.floor(maxZ / this.#cellSize);
    for (let x = minCellX; x <= maxCellX; x++) {
      for (let z = minCellZ; z <= maxCellZ; z++) {
        const bucket = grid.get(this.#cellKey(x, z));
        if (!bucket) continue;
        for (const box of bucket) {
          if (this.#candidateSet.has(box)) continue;
          this.#candidateSet.add(box);
          this.#candidates.push(box);
        }
      }
    }
    return this.#candidates;
  }

  #cellKey(x, z) {
    // Arena coordinates are tiny compared with this packing range; a numeric
    // key avoids allocating a template string for every hot-loop cell probe.
    return (x + 32768) * 65536 + (z + 32768);
  }
}
