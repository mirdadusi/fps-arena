/**
 * ArenaLayouts — data-driven arena definitions.
 * Each layout specifies geometry placements, pickup spots, and spawn points.
 */
export const ARENA_LAYOUTS = {

  classic: {
    name: 'Classic Arena',
    description: 'Balanced layout with symmetric cover',
    preview: '🏛️',
    pillars: [
      [-12, -12], [12, -12], [-12, 12], [12, 12],
      [0, -20], [0, 20], [-20, 0], [20, 0],
    ],
    coverBlocks: [
      { x: -8, z: 0, w: 6, d: 1.5 }, { x: 8, z: 0, w: 6, d: 1.5 },
      { x: 0, z: -8, w: 1.5, d: 6 }, { x: 0, z: 8, w: 1.5, d: 6 },
      { x: -20, z: -15, w: 4, d: 2 }, { x: 20, z: 15, w: 4, d: 2 },
      { x: -15, z: 20, w: 2, d: 4 }, { x: 15, z: -20, w: 2, d: 4 },
    ],
    crates: [[-5, -18], [5, 18], [-18, 5], [18, -5], [-22, -22], [22, 22], [0, 0]],
    pickupSpots: [
      { x: 0, z: 0, type: 'health' },
      { x: -20, z: -20, type: 'ammo' }, { x: 20, z: 20, type: 'ammo' },
      { x: -20, z: 20, type: 'shield' }, { x: 20, z: -20, type: 'speed' },
      { x: 0, z: -25, type: 'damage' },
    ],
    playerSpawns: [
      { x: -25, z: -25 }, { x: 25, z: 25 }, { x: -25, z: 25 },
      { x: 25, z: -25 }, { x: 0, z: -25 }, { x: 0, z: 25 },
    ],
  },

  warehouse: {
    name: 'Warehouse',
    description: 'Tight corridors and close-quarters combat',
    preview: '🏭',
    pillars: [
      [-10, -25], [-10, -15], [-10, -5], [-10, 5], [-10, 15], [-10, 25],
      [10, -25], [10, -15], [10, -5], [10, 5], [10, 15], [10, 25],
    ],
    coverBlocks: [
      { x: -18, z: -10, w: 1.5, d: 20 }, { x: 18, z: 10, w: 1.5, d: 20 },
      { x: 0, z: -18, w: 12, d: 1.5 }, { x: 0, z: 18, w: 12, d: 1.5 },
      { x: -5, z: -5, w: 8, d: 1.5 }, { x: 5, z: 5, w: 8, d: 1.5 },
      { x: -24, z: 0, w: 1.5, d: 10 }, { x: 24, z: 0, w: 1.5, d: 10 },
    ],
    crates: [
      [-15, -20], [15, 20], [-23, -15], [23, 15], [-8, 20], [8, -20],
      [0, -12], [0, 12], [-15, 8], [15, -8], [-22, 22], [22, -22],
    ],
    pickupSpots: [
      { x: 0, z: 0, type: 'health' },
      { x: -15, z: -15, type: 'ammo' }, { x: 15, z: 15, type: 'ammo' },
      { x: -22, z: 22, type: 'shield' }, { x: 22, z: -22, type: 'speed' },
      { x: 0, z: 25, type: 'damage' },
    ],
    playerSpawns: [
      { x: -25, z: -25 }, { x: 25, z: 25 }, { x: -25, z: 25 },
      { x: 25, z: -25 }, { x: 0, z: 0 }, { x: 15, z: -15 },
    ],
  },

  colosseum: {
    name: 'Colosseum',
    description: 'Open circular arena with long sightlines',
    preview: '⭕',
    pillars: [
      [22, 0], [19, 11], [11, 19], [0, 22], [-11, 19], [-19, 11],
      [-22, 0], [-19, -11], [-11, -19], [0, -22], [11, -19], [19, -11],
    ],
    coverBlocks: [
      { x: -7, z: 0, w: 4, d: 1.5 }, { x: 7, z: 0, w: 4, d: 1.5 },
      { x: 0, z: -7, w: 1.5, d: 4 }, { x: 0, z: 7, w: 1.5, d: 4 },
      { x: -18, z: -18, w: 3, d: 3 }, { x: 18, z: 18, w: 3, d: 3 },
      { x: -18, z: 18, w: 3, d: 3 }, { x: 18, z: -18, w: 3, d: 3 },
    ],
    crates: [
      [-12, 0], [12, 0], [0, -12], [0, 12],
      [-8, -8], [8, 8], [-8, 8], [8, -8],
    ],
    pickupSpots: [
      { x: 0, z: 0, type: 'damage' },
      { x: -18, z: 0, type: 'health' }, { x: 18, z: 0, type: 'health' },
      { x: 0, z: -18, type: 'ammo' }, { x: 0, z: 18, type: 'ammo' },
      { x: -12, z: -12, type: 'speed' }, { x: 12, z: 12, type: 'shield' },
    ],
    playerSpawns: [
      { x: -25, z: 0 }, { x: 25, z: 0 }, { x: 0, z: -25 },
      { x: 0, z: 25 }, { x: -18, z: -18 }, { x: 18, z: 18 },
    ],
  },

  fortress: {
    name: 'Fortress',
    description: 'Central stronghold with defensive positions',
    preview: '🏰',
    pillars: [
      [-5, -5], [5, -5], [-5, 5], [5, 5],
      [-20, -20], [20, -20], [-20, 20], [20, 20],
      [-20, 0], [20, 0], [0, -20], [0, 20],
    ],
    coverBlocks: [
      { x: -8, z: -8, w: 1.5, d: 8 }, { x: 8, z: -8, w: 1.5, d: 8 },
      { x: -8, z: 8, w: 1.5, d: 8 }, { x: 8, z: 8, w: 1.5, d: 8 },
      { x: -4, z: -12, w: 8, d: 1.5 }, { x: 4, z: 12, w: 8, d: 1.5 },
      { x: -12, z: -4, w: 1.5, d: 8 }, { x: 12, z: 4, w: 1.5, d: 8 },
      { x: -22, z: -10, w: 4, d: 2 }, { x: 22, z: 10, w: 4, d: 2 },
      { x: -10, z: 22, w: 2, d: 4 }, { x: 10, z: -22, w: 2, d: 4 },
    ],
    crates: [
      [0, 0], [-15, -15], [15, 15], [-15, 15], [15, -15],
      [-25, 10], [25, -10], [10, 25], [-10, -25],
    ],
    pickupSpots: [
      { x: 0, z: 0, type: 'damage' },
      { x: -15, z: -15, type: 'health' }, { x: 15, z: 15, type: 'health' },
      { x: -15, z: 15, type: 'ammo' }, { x: 15, z: -15, type: 'ammo' },
      { x: -25, z: 0, type: 'shield' }, { x: 25, z: 0, type: 'speed' },
    ],
    playerSpawns: [
      { x: -25, z: -25 }, { x: 25, z: 25 }, { x: -25, z: 25 },
      { x: 25, z: -25 }, { x: 0, z: -25 }, { x: 0, z: 25 },
    ],
  },
};
