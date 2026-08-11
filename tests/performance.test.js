import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { Enemy } from '../src/entities/Enemy.js';
import { EnemyModelAssets } from '../src/entities/EnemyModelAssets.js';
import { PhysicsSystem } from '../src/systems/PhysicsSystem.js';
import { BulletSystem } from '../src/systems/BulletSystem.js';
import { createProceduralTexture } from '../src/rendering/ProceduralTextures.js';
import { createRenderProfile, isAppleTouchDevice } from '../src/rendering/RenderProfile.js';
import { VillageWorld } from '../src/world/VillageWorld.js';

describe('continuous collision', () => {
  const thinWall = {
    min: new THREE.Vector3(0, 0, -2),
    max: new THREE.Vector3(0.2, 3, 2),
  };

  it('prevents a fast capsule from tunnelling through a thin wall', () => {
    const physics = new PhysicsSystem([thinWall]);
    const position = new THREE.Vector3(-2, 0, 0);
    physics.moveWithCollisions(position, 5, 0, 0.4, 0, 1.7);
    expect(position.x).toBeLessThanOrEqual(-0.399);
  });

  it('resolves an embedded capsule to the nearest expanded face', () => {
    const physics = new PhysicsSystem([{
      min: new THREE.Vector3(-2, 0, -1),
      max: new THREE.Vector3(2, 3, 1),
    }]);
    const position = new THREE.Vector3(0, 0, 0);
    physics.resolveCollision(position, 0.5, 0, 1.7);
    expect(Math.abs(position.z)).toBeCloseTo(1.5);
  });

  it('sweeps high-speed projectiles and reuses their mesh', () => {
    const scene = new THREE.Scene();
    const physics = new PhysicsSystem([thinWall]);
    const bullets = new BulletSystem(scene, physics);
    bullets.spawn(new THREE.Vector3(-2, 1, 0), new THREE.Vector3(1, 0, 0), false);
    const firstMesh = bullets.activeBullets[0].mesh;
    const onWallHit = vi.fn();
    bullets.update(0.1, { onWallHit });
    expect(onWallHit).toHaveBeenCalledOnce();
    expect(bullets.activeBullets).toHaveLength(0);

    bullets.spawn(new THREE.Vector3(-2, 1, 0), new THREE.Vector3(1, 0, 0), false);
    expect(bullets.activeBullets[0].mesh).toBe(firstMesh);
    bullets.dispose();
  });
});

describe('shared rendering resources', () => {
  it('shares bot GPU assets and creates no permanent point lights', () => {
    const scene = new THREE.Scene();
    const assets = new EnemyModelAssets();
    const disposeTorso = vi.spyOn(assets.geometries.torso, 'dispose');
    const first = new Enemy(scene, null, assets);
    const second = new Enemy(scene, null, assets);
    const firstMeshes = [];
    const secondMeshes = [];
    first.group.traverse(object => { if (object.isMesh) firstMeshes.push(object); });
    second.group.traverse(object => { if (object.isMesh) secondMeshes.push(object); });

    expect(firstMeshes.length).toBeGreaterThan(20);
    expect(firstMeshes[0].geometry).toBe(secondMeshes[0].geometry);
    expect(firstMeshes[0].material).toBe(secondMeshes[0].material);
    const pointLights = [];
    scene.traverse(object => { if (object.isPointLight) pointLights.push(object); });
    expect(pointLights).toHaveLength(0);

    first.destroy();
    second.destroy();
    expect(disposeTorso).not.toHaveBeenCalled();
    assets.dispose();
    expect(disposeTorso).toHaveBeenCalledOnce();
  });

  it('builds compact, repeatable textures suitable for caching', () => {
    const texture = createProceduralTexture({ base: 0x456735, pattern: 'grass', seed: 8 });
    expect(texture.image.width).toBe(64);
    expect(texture.image.height).toBe(64);
    expect(texture.wrapS).toBe(THREE.RepeatWrapping);
    expect(texture.colorSpace).toBe(THREE.SRGBColorSpace);
    texture.dispose();
  });

  it('batches the static Village into a small draw-call budget', () => {
    const scene = new THREE.Scene();
    const village = new VillageWorld(scene, () => {});
    const meshes = [];
    village.group.traverse(object => { if (object.isMesh) meshes.push(object); });
    expect(meshes.length).toBeLessThanOrEqual(15);
    expect(meshes.every(mesh => mesh.name.startsWith('village-static-batch-'))).toBe(true);
    expect(village.group.children.some(object => object.isPointLight)).toBe(false);
    village.destroy();
  });
});

describe('mobile render profile', () => {
  it('recognizes iPad desktop mode and starts below native pixel density', () => {
    const input = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)',
      platform: 'MacIntel', maxTouchPoints: 5,
      hardwareConcurrency: 8, deviceMemory: 8,
      devicePixelRatio: 2, coarsePointer: true,
    };
    expect(isAppleTouchDevice(input)).toBe(true);
    const profile = createRenderProfile(input);
    expect(profile.appleTouch).toBe(true);
    expect(profile.pixelRatio).toBe(0.85);
    expect(profile.antialias).toBe(false);
    expect(profile.shadows).toBe(false);
    expect(profile.aiInterval).toBeCloseTo(1 / 30);
  });
});
