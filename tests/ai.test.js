import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { extractCoverPoints } from '../src/ai/CoverPoints.js';
import { EnemyAI } from '../src/ai/EnemyAI.js';
import { DifficultyManager } from '../src/ai/DifficultyManager.js';
import { PhysicsSystem } from '../src/systems/PhysicsSystem.js';
import { Config } from '../src/Config.js';

function enemyAt(x = 0, z = 0) {
  return {
    alive: true,
    hp: Config.enemy.maxHP,
    position: new THREE.Vector3(x, 0, z),
    group: { rotation: { y: 0 } },
  };
}

const openPhysics = {
  hasLineOfSight: () => true,
  isWalkable: () => true,
  resolveCollision: () => {},
};

describe('cover extraction and physics', () => {
  it('produces finite face points from Vector3 AABBs', () => {
    const collider = {
      min: new THREE.Vector3(-2, 0, -1),
      max: new THREE.Vector3(2, 3, 1),
    };
    const points = extractCoverPoints([collider]);
    expect(points).toHaveLength(4);
    expect(points.every(point => Number.isFinite(point.x) && Number.isFinite(point.z))).toBe(true);
    expect(points).toContainEqual({ x: 0, z: -2.2 });
  });

  it('blocks line of sight only when an AABB lies inside the segment', () => {
    const physics = new PhysicsSystem([{
      min: new THREE.Vector3(-1, 0, -1),
      max: new THREE.Vector3(1, 3, 1),
    }]);
    expect(physics.hasLineOfSight(new THREE.Vector3(-5, 1, 0), new THREE.Vector3(5, 1, 0))).toBe(false);
    expect(physics.hasLineOfSight(new THREE.Vector3(-5, 1, 5), new THREE.Vector3(5, 1, 5))).toBe(true);
    expect(physics.isWalkable(new THREE.Vector3(0, 0, 0), 0.5)).toBe(false);
    expect(physics.isWalkable(new THREE.Vector3(3, 0, 0), 0.5)).toBe(true);
  });
});

describe('EnemyAI', () => {
  it('acquires, reacts, and fires normalized predictive shots', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const enemy = enemyAt(0, 0);
    const ai = new EnemyAI(enemy, openPhysics);
    const diff = new DifficultyManager().getProfile(12);
    const player = new THREE.Vector3(14, Config.player.height, 0);
    let shot = null;

    for (let frame = 0; frame < 240 && !shot; frame++) {
      player.z += 0.02;
      shot = ai.update(1 / 60, player, diff)[0] || null;
    }

    expect(shot).not.toBeNull();
    expect(shot.length()).toBeCloseTo(1, 5);
    const directAim = player.clone().sub(enemy.position).normalize();
    expect(shot.dot(directAim)).toBeGreaterThan(0.9);
    vi.restoreAllMocks();
  });

  it('selects a survival tactic when badly hurt', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.25);
    const enemy = enemyAt(0, 0);
    enemy.hp = 20;
    const ai = new EnemyAI(enemy, openPhysics);
    ai.setCoverPoints([{ x: -4, z: 3 }, { x: 5, z: 2 }]);
    const diff = new DifficultyManager().getProfile(12);

    ai.update(1 / 60, new THREE.Vector3(12, 1.7, 0), diff);

    expect(['retreat', 'cover', 'holdCover']).toContain(ai.state);
    vi.restoreAllMocks();
  });

  it('difficulty profiles improve reaction and aim lead by tier', () => {
    const manager = new DifficultyManager();
    const normal = manager.getProfile(0);
    const impossible = manager.getProfile(99);
    expect(impossible.reactionTime).toBeLessThan(normal.reactionTime);
    expect(impossible.aimLead).toBeGreaterThan(normal.aimLead);
    expect(impossible.aggression).toBeGreaterThan(normal.aggression);
  });
});
