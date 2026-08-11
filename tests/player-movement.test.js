// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { Player } from '../src/entities/Player.js';
import { PhysicsSystem } from '../src/systems/PhysicsSystem.js';
import { Config } from '../src/Config.js';

describe('Player vertical controller', () => {
  let player;
  afterEach(() => player?.destroy());

  it('jumps under gravity and lands back on the terrain', () => {
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, Config.player.height, 0);
    player = new Player(camera);
    const physics = new PhysicsSystem([]);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    player.update(1 / 60);
    player.updateVertical(1 / 60, physics);
    expect(player.position.y).toBeGreaterThan(Config.player.height);
    expect(player.isGrounded).toBe(false);

    for (let frame = 0; frame < 180; frame++) player.updateVertical(1 / 60, physics);
    expect(player.isGrounded).toBe(true);
    expect(player.position.y).toBeCloseTo(Config.player.height, 3);
  });

  it('crouches smoothly and cannot stand inside a crawl space', () => {
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(0, Config.player.height, 0);
    player = new Player(camera);
    const physics = new PhysicsSystem([{
      min: new THREE.Vector3(-2, 1.35, -2),
      max: new THREE.Vector3(2, 2.5, 2),
    }]);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ControlLeft' }));
    for (let frame = 0; frame < 30; frame++) {
      player.update(1 / 60);
      player.updateVertical(1 / 60, physics);
    }
    expect(player.bodyHeight).toBeCloseTo(Config.player.crouchHeight, 2);

    document.dispatchEvent(new KeyboardEvent('keyup', { code: 'ControlLeft' }));
    for (let frame = 0; frame < 30; frame++) {
      player.update(1 / 60);
      player.updateVertical(1 / 60, physics);
    }
    expect(player.bodyHeight).toBeLessThanOrEqual(1.35);
    expect(player.isCrouching).toBe(true);
  });
});
