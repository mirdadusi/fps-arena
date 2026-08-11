/**
 * Shared terrain equation for the Village map.
 *
 * Rendering, player physics and bot navigation all call this exact function,
 * so the visible ground can never drift away from the collision surface.
 */
export function villageGroundHeight(x, z) {
  const hill = (cx, cz, radius, height) => {
    const distance = Math.hypot(x - cx, z - cz);
    if (distance >= radius) return 0;
    const t = 1 - distance / radius;
    return height * t * t * (3 - 2 * t);
  };

  let height = 0;
  height += hill(-23, -20, 17, 2.8);
  height += hill(24, 17, 14, 2.1);
  height += hill(-25, 19, 11, 1.3);

  // Keep the village square, house floors and cave passage comfortably flat.
  const centerFade = Math.min(1, Math.max(0, (Math.hypot(x, z) - 11) / 8));
  height *= centerFade;
  if (x > 14 && x < 23 && z > 11) height *= Math.min(1, Math.abs(x - 18.5) / 4.5);

  return Math.max(0, height);
}

