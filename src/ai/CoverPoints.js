/**
 * CoverPoints — extracts world-space cover positions from arena AABB colliders.
 * Returns {x, z} positions at the mid-point of each face, suitable for enemy
 * cover-seeking navigation.
 */

/**
 * @param {Array<{min:{x:number,z:number},max:{x:number,z:number}}>} colliders
 * @returns {{x:number, z:number}[]}
 */
export function extractCoverPoints(colliders) {
  const points = [];

  for (const c of colliders) {
    const midX = (c.min.x + c.max.x) / 2;
    const midZ = (c.min.z + c.max.z) / 2;
    const offset = 1.2; // stand just outside the face

    // Four face mid-points: north, south, east, west
    points.push({ x: midX,             z: c.min.z - offset });
    points.push({ x: midX,             z: c.max.z + offset });
    points.push({ x: c.min.x - offset, z: midZ });
    points.push({ x: c.max.x + offset, z: midZ });
  }

  if (import.meta.env?.DEV !== false) {
    console.assert(
      points.length >= 4,
      `[CoverPoints] Expected ≥4 cover points, got ${points.length}`,
    );
  }

  return points;
}
