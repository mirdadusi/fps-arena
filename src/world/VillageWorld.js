import * as THREE from 'three';
import { Config } from '../Config.js';
import { villageGroundHeight } from './VillageTerrain.js';
import { disposeObject3D } from '../rendering/disposeObject3D.js';
import { createProceduralTexture } from '../rendering/ProceduralTextures.js';

/**
 * Procedural, asset-free village environment. Geometry creation lives outside
 * Arena so competitive maps remain small data-only layouts.
 */
export class VillageWorld {
  group = new THREE.Group();
  #destroyed = false;

  constructor(scene, addCollider) {
    this.scene = scene;
    this.addCollider = addCollider;
    // Repeated scenery uses one GPU geometry per shape and is transformed by
    // each mesh. This replaces more than a hundred near-identical buffers.
    this.geometries = {
      box: new THREE.BoxGeometry(1, 1, 1),
      plane: new THREE.PlaneGeometry(1, 1),
      trunk: new THREE.CylinderGeometry(0.28, 0.42, 1, 7),
      crown: new THREE.ConeGeometry(1, 1, 7),
      shrub: new THREE.DodecahedronGeometry(1, 0),
      rock: new THREE.DodecahedronGeometry(1, 1),
      log: new THREE.CylinderGeometry(0.42, 0.5, 1, 8),
      bale: new THREE.CylinderGeometry(0.8, 0.8, 1, 12),
      roof: new THREE.ConeGeometry(1, 1, 4),
    };
    this.materials = this.#createMaterials();
    this.group.name = 'village-world';
    scene.add(this.group);

    this.#buildTerrain();
    this.#buildRoads();
    this.#buildVillageBuildings();
    this.#buildForest();
    this.#buildCave();
    this.#buildNaturalCover();
    this.#buildBoundary();
  }

  #createMaterials() {
    const texture = (base, pattern, seed, repeat) => createProceduralTexture({ base, pattern, seed, repeat });
    return {
      grass: new THREE.MeshStandardMaterial({ map: texture(0x53773b, 'grass', 3, [16, 16]), roughness: 1 }),
      road: new THREE.MeshStandardMaterial({ map: texture(0x8b7657, 'stone', 7, [7, 12]), roughness: 1 }),
      stone: new THREE.MeshStandardMaterial({ map: texture(0x64645e, 'stone', 11, [3, 3]), roughness: 0.95 }),
      stoneDark: new THREE.MeshStandardMaterial({ map: texture(0x343733, 'stone', 13, [3, 3]), roughness: 1 }),
      wood: new THREE.MeshStandardMaterial({ map: texture(0x68462b, 'wood', 17, [2, 5]), roughness: 0.9 }),
      woodDark: new THREE.MeshStandardMaterial({ map: texture(0x352419, 'wood', 19, [2, 5]), roughness: 0.95 }),
      plaster: new THREE.MeshStandardMaterial({ map: texture(0xc1ad83, 'plaster', 23, [4, 3]), roughness: 0.95 }),
      roof: new THREE.MeshStandardMaterial({ map: texture(0x75372b, 'roof', 29, [5, 5]), roughness: 0.9 }),
      leaf: new THREE.MeshStandardMaterial({ map: texture(0x274d27, 'grass', 31, [3, 3]), roughness: 1 }),
      leafLight: new THREE.MeshStandardMaterial({ map: texture(0x3d6932, 'grass', 37, [3, 3]), roughness: 1 }),
      glass: new THREE.MeshStandardMaterial({ color: 0x8fc6c8, roughness: 0.15, metalness: 0.1 }),
      hay: new THREE.MeshStandardMaterial({ map: texture(0xb9923f, 'hay', 41, [3, 4]), roughness: 1 }),
    };
  }

  #add(mesh, castShadow = true, receiveShadow = true) {
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    this.group.add(mesh);
    return mesh;
  }

  #box(x, y, z, w, h, d, material, collider = true) {
    const mesh = this.#add(new THREE.Mesh(this.geometries.box, material));
    mesh.position.set(x, y + h / 2, z);
    mesh.scale.set(w, h, d);
    if (collider) this.addCollider(x, y, z, w, h, d);
    return mesh;
  }

  #buildTerrain() {
    const size = Config.arena.size;
    const geometry = new THREE.PlaneGeometry(size, size, 40, 40);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      positions.setY(i, villageGroundHeight(positions.getX(i), positions.getZ(i)) + 0.025);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    this.#add(new THREE.Mesh(geometry, this.materials.grass), false, true);
  }

  #buildRoads() {
    const road = (x, z, w, d, rotation = 0) => {
      const mesh = this.#add(new THREE.Mesh(this.geometries.plane, this.materials.road), false, true);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = rotation;
      mesh.position.set(x, 0.055, z);
      mesh.scale.set(w, d, 1);
    };
    road(0, 0, 8, 54);
    road(0, 0, 46, 7);
    road(13, 14, 5, 25, -0.38);

    // Stone well: useful circular cover in the village square.
    const well = this.#add(new THREE.Mesh(
      new THREE.CylinderGeometry(2.1, 2.25, 1.25, 18, 1, true),
      this.materials.stone,
    ));
    well.position.set(0, 0.625, 0);
    this.addCollider(0, 0, 0, 4.1, 1.25, 4.1);
    const roof = this.#add(new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.1, 8), this.materials.roof));
    roof.position.set(0, 3.5, 0);
    this.#box(-1.8, 1.2, 0, 0.18, 2.2, 0.18, this.materials.wood);
    this.#box(1.8, 1.2, 0, 0.18, 2.2, 0.18, this.materials.wood);
  }

  #buildVillageBuildings() {
    this.#house(-13, -8, 9, 8, 'south');
    this.#house(13, -7, 8, 9, 'west');
    this.#house(-13, 11, 8, 7, 'east');
    this.#barn(10, 11);
  }

  #house(x, z, w, d, doorSide) {
    const h = 3.3;
    const t = 0.35;
    const doorWidth = 1.8;
    const floor = villageGroundHeight(x, z);
    this.#box(x, floor - 0.05, z, w, 0.12, d, this.materials.woodDark, false);

    const wall = (wx, wz, ww, wd) => this.#box(wx, floor, wz, ww, h, wd, this.materials.plaster);
    if (doorSide === 'south' || doorSide === 'north') {
      const dz = doorSide === 'south' ? -d / 2 : d / 2;
      wall(x - (w + doorWidth) / 4, z + dz, (w - doorWidth) / 2, t);
      wall(x + (w + doorWidth) / 4, z + dz, (w - doorWidth) / 2, t);
      wall(x, z - dz, w, t);
      wall(x - w / 2, z, t, d);
      wall(x + w / 2, z, t, d);
    } else {
      const dx = doorSide === 'west' ? -w / 2 : w / 2;
      wall(x + dx, z - (d + doorWidth) / 4, t, (d - doorWidth) / 2);
      wall(x + dx, z + (d + doorWidth) / 4, t, (d - doorWidth) / 2);
      wall(x - dx, z, t, d);
      wall(x, z - d / 2, w, t);
      wall(x, z + d / 2, w, t);
    }

    // A low interior divider produces meaningful room-clearing choices.
    this.#box(x, floor, z + d * 0.12, w * 0.45, 2.2, 0.22, this.materials.wood);

    const roof = this.#add(new THREE.Mesh(this.geometries.roof, this.materials.roof));
    roof.position.set(x, floor + h + 1.15, z);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(Math.max(w, d) * 0.72, 2.6, Math.max(w, d) * 0.72);

    // Lit-looking windows without external texture assets.
    const pane = this.#add(new THREE.Mesh(this.geometries.plane, this.materials.glass), false, false);
    pane.position.set(x, floor + 1.8, z - d / 2 - 0.181);
    pane.scale.set(1.15, 0.85, 1);
  }

  #barn(x, z) {
    const floor = villageGroundHeight(x, z);
    const w = 11;
    const d = 9;
    const h = 4.2;
    const t = 0.4;
    // Wide open southern doors.
    this.#box(x - 4.25, floor, z - d / 2, 2.5, h, t, this.materials.wood);
    this.#box(x + 4.25, floor, z - d / 2, 2.5, h, t, this.materials.wood);
    this.#box(x, floor, z + d / 2, w, h, t, this.materials.wood);
    this.#box(x - w / 2, floor, z, t, h, d, this.materials.wood);
    this.#box(x + w / 2, floor, z, t, h, d, this.materials.wood);
    const roof = this.#add(new THREE.Mesh(this.geometries.roof, this.materials.roof));
    roof.position.set(x, floor + h + 1.35, z);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(8.2, 3.4, 8.2);
    for (const [ox, oz] of [[-3, 1.4], [3, 1.5], [0, 2.8]]) {
      const bale = this.#add(new THREE.Mesh(this.geometries.bale, this.materials.hay));
      bale.rotation.z = Math.PI / 2;
      bale.position.set(x + ox, floor + 0.8, z + oz);
      bale.scale.y = 1.4;
      this.addCollider(x + ox, floor, z + oz, 1.4, 1.6, 1.6);
    }
  }

  #buildForest() {
    const trees = [
      [-25,-25,1.2],[-20,-26,0.9],[-15,-24,1.1],[-26,-17,1.0],[-20,-16,1.2],[-26,-9,0.9],
      [24,-25,1.1],[18,-24,0.9],[26,-18,1.2],[21,-15,1.0],[27,-8,1.1],
      [-27,24,1.1],[-21,26,0.9],[-17,22,1.2],[-25,16,1.0],[-19,16,0.9],
      [27,25,1.1],[24,14,0.9],[28,7,1.2],[20,26,1.0],
    ];
    for (const [x, z, scale] of trees) this.#tree(x, z, scale);

    const bushes = [
      [-22,-21],[-17,-20],[-24,-13],[22,-20],[25,-12],[-22,20],[-17,18],
      [24,21],[19,17],[-8,-18],[7,-20],[-6,19],[6,22],
    ];
    for (const [x, z] of bushes) {
      const y = villageGroundHeight(x, z);
      const shrub = this.#add(new THREE.Mesh(this.geometries.shrub, this.materials.leafLight), false, true);
      shrub.position.set(x, y + 0.85, z);
      shrub.scale.set(1.69, 0.94, 1.38);
      this.addCollider(x, y + 0.15, z, 2.8, 1.5, 2.3, {
        blocksMovement: false,
        blocksSight: true,
      });
    }
  }

  #tree(x, z, scale) {
    const y = villageGroundHeight(x, z);
    const trunkH = 3.6 * scale;
    const trunk = this.#add(new THREE.Mesh(this.geometries.trunk, this.materials.woodDark));
    trunk.position.set(x, y + trunkH / 2, z);
    trunk.scale.set(scale, trunkH, scale);
    this.addCollider(x, y, z, 0.72 * scale, trunkH, 0.72 * scale);
    for (let level = 0; level < 3; level++) {
      const crown = this.#add(new THREE.Mesh(
        this.geometries.crown,
        level % 2 ? this.materials.leafLight : this.materials.leaf,
      ), false, true);
      crown.position.set(x, y + trunkH + 0.5 + level * 1.35 * scale, z);
      crown.scale.set((2.2 - level * 0.35) * scale, 2.8 * scale, (2.2 - level * 0.35) * scale);
    }
    this.addCollider(x, y + trunkH - 0.2, z, 3.5 * scale, 4.5 * scale, 3.5 * scale, {
      blocksMovement: false,
      blocksSight: true,
    });
  }

  #buildCave() {
    // A traversable rock tunnel with a crouch-height side opening.
    const rocks = [
      [15.2,16,2.8,3.4,4.0],[21.8,16,2.8,3.4,4.0],
      [14.8,20,3.2,4.0,4.5],[22.2,20,3.2,4.0,4.5],
      [14.6,24,3.5,4.5,4.5],[22.4,24,3.5,4.5,4.5],
    ];
    for (const [x,z,w,h,d] of rocks) {
      const mesh = this.#add(new THREE.Mesh(this.geometries.rock, this.materials.stoneDark));
      mesh.position.set(x, h / 2 - 0.2, z);
      mesh.scale.set(w / 2, h / 2, d / 2);
      this.addCollider(x, 0, z, w * 0.82, h, d * 0.82);
    }
    this.#box(18.5, 2.65, 20, 5.1, 1.35, 12, this.materials.stoneDark);

    // Side crawl space: only crouched players can use this hiding route.
    this.#box(22.2, 0, 25.2, 1.5, 2.6, 6.0, this.materials.stoneDark);
    this.#box(25.0, 0, 28.0, 7.0, 2.6, 1.5, this.materials.stoneDark);
    this.#box(24.5, 1.35, 24.2, 4.8, 1.05, 3.0, this.materials.stoneDark);

    const glow = new THREE.PointLight(0xffa34d, 5, 13);
    glow.position.set(18.5, 1.3, 23.5);
    this.group.add(glow);
  }

  #buildNaturalCover() {
    const boulders = [[-7,-14,1.4],[8,-16,1.7],[-8,18,1.5],[6,19,1.25],[-22,3,1.6],[23,2,1.4]];
    for (const [x,z,r] of boulders) {
      const y = villageGroundHeight(x, z);
      const mesh = this.#add(new THREE.Mesh(this.geometries.rock, this.materials.stone));
      mesh.position.set(x, y + r * 0.72, z);
      mesh.scale.set(r, r * 0.72, r);
      mesh.rotation.set(0.12, x * 0.17, -0.08);
      this.addCollider(x, y, z, r * 1.7, r * 1.35, r * 1.7);
    }

    // Jumpable fallen logs.
    for (const [x,z,rot] of [[-7,7,0.25],[5,-11,-0.35],[-18,2,0.1]]) {
      const y = villageGroundHeight(x, z);
      const log = this.#add(new THREE.Mesh(this.geometries.log, this.materials.woodDark));
      log.rotation.z = Math.PI / 2;
      log.rotation.y = rot;
      log.position.set(x, y + 0.5, z);
      log.scale.y = 4.5;
      this.addCollider(x, y, z, 4.4, 0.95, 1.0);
    }
  }

  #buildBoundary() {
    const half = Config.arena.size / 2 - 0.75;
    for (let p = -27; p <= 27; p += 3) {
      this.#box(p, 0, -half, 0.16, 1.6, 0.16, this.materials.wood, false);
      this.#box(p, 0, half, 0.16, 1.6, 0.16, this.materials.wood, false);
      this.#box(-half, 0, p, 0.16, 1.6, 0.16, this.materials.wood, false);
      this.#box(half, 0, p, 0.16, 1.6, 0.16, this.materials.wood, false);
    }
  }

  destroy() {
    if (this.#destroyed) return;
    this.#destroyed = true;
    this.scene.remove(this.group);
    disposeObject3D(this.group);
    this.group.clear();
  }
}
