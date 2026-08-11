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

  village: {
    name: 'Village Survival',
    description: 'Woods, houses, hills and a hidden cave route',
    preview: '🌲',
    environment: 'village',
    worldBuilder: 'village',
    pillars: [],
    coverBlocks: [],
    crates: [],
    pickupSpots: [
      { x: 0, z: 5, type: 'health' },
      { x: -13, z: -8, type: 'ammo' },
      { x: 10, z: 11, type: 'ammo' },
      { x: 18.5, z: 23, type: 'damage' },
      { x: -23, z: -20, type: 'speed' },
      { x: 23, z: -20, type: 'shield' },
    ],
    playerSpawns: [
      { x: 0, z: -24 }, { x: -24, z: -18 }, { x: 24, z: -18 },
      { x: -23, z: 22 }, { x: 18.5, z: 24 }, { x: 0, z: 22 },
    ],
    // Authored links keep bots reliable through doors, behind houses and into
    // the cave instead of asking local obstacle avoidance to solve a maze.
    navigationNodes: [
      { id: 'south', x: 0, z: -24, links: ['cross_s', 'wood_sw', 'wood_se'] },
      { id: 'cross_s', x: 0, z: -11, links: ['south', 'square', 'house_sw_door', 'house_se_door'] },
      { id: 'square', x: 0, z: 5, links: ['cross_s', 'cross_n', 'west_lane', 'east_lane'] },
      { id: 'cross_n', x: 0, z: 17, links: ['square', 'north', 'barn_door', 'house_nw_door'] },
      { id: 'north', x: 0, z: 26, links: ['cross_n', 'wood_nw', 'cave_entry'] },
      { id: 'west_lane', x: -20, z: 4, links: ['square', 'wood_sw', 'wood_nw', 'house_sw_door', 'house_nw_door'] },
      { id: 'east_lane', x: 21, z: 4, links: ['square', 'wood_se', 'barn_door', 'cave_entry'] },
      { id: 'wood_sw', x: -23, z: -19, tags: ['hide'], links: ['south', 'west_lane', 'hill_sw'] },
      { id: 'hill_sw', x: -17, z: -22, tags: ['ambush'], links: ['wood_sw', 'south'] },
      { id: 'wood_se', x: 23, z: -20, tags: ['hide'], links: ['south', 'east_lane'] },
      { id: 'wood_nw', x: -23, z: 21, tags: ['hide', 'ambush'], links: ['north', 'west_lane'] },
      { id: 'house_sw_door', x: -13, z: -13, links: ['cross_s', 'west_lane', 'house_sw_inside'] },
      { id: 'house_sw_inside', x: -13, z: -8, tags: ['hide'], links: ['house_sw_door'] },
      { id: 'house_se_door', x: 8.5, z: -7, links: ['cross_s', 'east_lane', 'house_se_inside'] },
      { id: 'house_se_inside', x: 13, z: -7, tags: ['hide'], links: ['house_se_door'] },
      { id: 'house_nw_door', x: -8.5, z: 11, links: ['cross_n', 'west_lane', 'house_nw_inside'] },
      { id: 'house_nw_inside', x: -13, z: 11, tags: ['hide'], links: ['house_nw_door'] },
      { id: 'barn_door', x: 10, z: 5.5, links: ['cross_n', 'east_lane', 'barn_inside'] },
      { id: 'barn_inside', x: 10, z: 12, tags: ['hide', 'ambush'], links: ['barn_door'] },
      { id: 'cave_entry', x: 18.5, z: 13, links: ['east_lane', 'north', 'cave_mid'] },
      { id: 'cave_mid', x: 18.5, z: 19, tags: ['hide'], links: ['cave_entry', 'cave_deep'] },
      { id: 'cave_deep', x: 18.5, z: 25, tags: ['hide', 'ambush'], links: ['cave_mid'] },
      { id: 'crawl_exit', x: 25.5, z: 25, tags: ['hide'], links: ['wood_ne'] },
      { id: 'wood_ne', x: 26, z: 16, tags: ['hide'], links: ['crawl_exit', 'east_lane'] },
    ],
  },
};
