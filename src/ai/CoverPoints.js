/**
 * CoverPoints — extracts world-space cover positions from arena AABB colliders.
 * Returns {x, z} positions at the mid-point of each face, suitable for enemy
 * cover-seeking navigation.
 */

/**
 * @param {Array<{minX:number,maxX:number,minZ:number,maxZ:number}>} colliders
 * @returns {{x:number, z:number}[]}
 */
export function extractCoverPoints(colliders) {
  const points = [];

  for (const c of colliders) {
    const midX = (c.minX + c.maxX) / 2;
    const midZ = (c.minZ + c.maxZ) / 2;
    const halfW = (c.maxX - c.minX) / 2;
    const halfD = (c.maxZ - c.minZ) / 2;
    const offset = 1.2; // stand just outside the face

    // Four face mid-points: north, south, east, west
    points.push({ x: midX,           z: c.minZ - offset });
    points.push({ x: midX,           z: c.maxZ + offset });
    points.push({ x: c.minX - offset, z: midZ });
    points.push({ x: c.maxX + offset, z: midZ });
  }

  if (import.meta.env?.DEV !== false) {
    console.assert(
      points.length >= 4,
      `[CoverPoints] Expected ≥4 cover points, got ${points.length}`,
    );
  }

  return points;
}
