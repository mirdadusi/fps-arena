import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { ARENA_LAYOUTS } from '../src/world/ArenaLayouts.js';
import { villageGroundHeight } from '../src/world/VillageTerrain.js';
import { NavigationGraph } from '../src/ai/NavigationGraph.js';
import { PhysicsSystem } from '../src/systems/PhysicsSystem.js';
import { EnemyAI } from '../src/ai/EnemyAI.js';
import { DifficultyManager } from '../src/ai/DifficultyManager.js';
import { Config } from '../src/Config.js';

describe('Village world data', () => {
  it('provides finite terrain, safe spawns and an authored cave route', () => {
    const village = ARENA_LAYOUTS.village;
    expect(village.worldBuilder).toBe('village');
    expect(village.playerSpawns.length).toBeGreaterThanOrEqual(5);
    expect(village.navigationNodes.some(node => node.id === 'cave_deep' && node.tags.includes('ambush'))).toBe(true);
    for (const spawn of village.playerSpawns) {
      expect(Number.isFinite(villageGroundHeight(spawn.x, spawn.z))).toBe(true);
    }
    expect(villageGroundHeight(-23, -20)).toBeGreaterThan(1);
    expect(villageGroundHeight(0, 0)).toBe(0);
  });
});

describe('vertical movement physics', () => {
  const roof = {
    min: new THREE.Vector3(-2, 1.35, -2),
    max: new THREE.Vector3(2, 2.4, 2),
  };

  it('allows crouching under a roof but rejects standing', () => {
    const physics = new PhysicsSystem([roof]);
    const position = new THREE.Vector3(0, Config.player.crouchHeight, 0);
    expect(physics.canOccupy(position, Config.player.radius, 0, Config.player.crouchHeight)).toBe(true);
    expect(physics.canOccupy(position, Config.player.radius, 0, Config.player.height)).toBe(false);
    expect(physics.ceilingHeightAt(position, Config.player.radius, 0)).toBeCloseTo(1.35);
  });

  it('lets a jumping body clear a low log while grounded movement collides', () => {
    const log = {
      min: new THREE.Vector3(-2, 0, -0.5),
      max: new THREE.Vector3(2, 0.95, 0.5),
    };
    const physics = new PhysicsSystem([log]);
    const position = new THREE.Vector3(0, 1.7, 0);
    expect(physics.checkAABB(position, 0.4, 0, 1.7)).not.toBeNull();
    expect(physics.checkAABB(position, 0.4, 1.0, 1.7)).toBeNull();
  });

  it('uses the same terrain callback as rendering', () => {
    const physics = new PhysicsSystem([], { groundHeightAt: villageGroundHeight });
    expect(physics.groundHeightAt(-23, -20)).toBeCloseTo(villageGroundHeight(-23, -20));
  });

  it('treats foliage as concealment rather than a solid wall', () => {
    const foliage = {
      min: new THREE.Vector3(-1, 0, -1),
      max: new THREE.Vector3(1, 2, 1),
      blocksMovement: false,
      blocksSight: true,
    };
    const physics = new PhysicsSystem([foliage]);
    expect(physics.isWalkable(new THREE.Vector3(0, 0, 0), 0.4)).toBe(true);
    expect(physics.pointInsideWall(new THREE.Vector3(0, 1, 0))).toBe(false);
    expect(physics.hasLineOfSight(new THREE.Vector3(-3, 1, 0), new THREE.Vector3(3, 1, 0))).toBe(false);
  });
});

describe('Village bot navigation and hearing', () => {
  it('routes around an occluding wall through authored waypoints', () => {
    const physics = new PhysicsSystem([{
      min: new THREE.Vector3(-1, 0, -1),
      max: new THREE.Vector3(1, 3, 1),
    }]);
    const graph = new NavigationGraph([
      { id: 'left', x: -2, z: 2, links: ['right'] },
      { id: 'right', x: 2, z: 2, links: ['left'] },
    ], physics);
    const waypoint = new THREE.Vector3();
    expect(graph.findNextWaypoint(new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0), waypoint)).toBe(true);
    expect(waypoint.z).toBe(2);
  });

  it('investigates a nearby gunshot without gaining supernatural sight', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const enemy = {
      alive: true,
      hp: Config.enemy.maxHP,
      position: new THREE.Vector3(0, 0, 0),
      group: { rotation: { y: 0 } },
    };
    const physics = {
      hasLineOfSight: () => false,
      isWalkable: () => true,
      resolveCollision: () => {},
      groundHeightAt: () => 0,
    };
    const ai = new EnemyAI(enemy, physics);
    ai.hearNoise(new THREE.Vector3(10, 1.7, 0));
    const shots = ai.update(1 / 60, new THREE.Vector3(20, 1.7, 0), new DifficultyManager().getProfile(0));
    expect(ai.state).toBe('investigate');
    expect(shots).toHaveLength(0);
    expect(enemy.position.x).toBeGreaterThan(0);
    vi.restoreAllMocks();
  });
});
