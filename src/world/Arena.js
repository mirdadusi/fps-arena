import * as THREE from 'three';
import { Config } from '../Config.js';
import { ARENA_LAYOUTS } from './ArenaLayouts.js';
import { PersistenceStore } from '../stores/PersistenceStore.js';
import { Lifetime } from '../core/Lifetime.js';
import { disposeObject3D } from '../rendering/disposeObject3D.js';
import { VillageWorld } from './VillageWorld.js';
import { villageGroundHeight } from './VillageTerrain.js';
import { createProceduralTexture } from '../rendering/ProceduralTextures.js';
import { createRenderProfile } from '../rendering/RenderProfile.js';

/**
 * Arena — builds the 3D world: floor, walls, pillars, crates, lighting.
 * Supports multiple arena layouts via ArenaLayouts data.
 *
 * Pattern: Builder — constructs the world from data-driven layout definitions.
 */
export class Arena {
  scene;
  renderer;
  camera;
  colliders = [];

  #floorMat;
  #wallMat;
  #pillarMat;
  #crateMat;
  #layoutMeshes = [];
  #currentLayout;
  #proceduralWorld = null;
  #lifetime = new Lifetime();
  #destroyed = false;
  #pixelRatio = 1;
  #maxPixelRatio = 1;
  #frameTimeEMA = 1 / 60;
  #qualityTimer = 0;
  #renderProfile = createRenderProfile();

  get pickupSpots()   { return this.#currentLayout?.pickupSpots || []; }
  get playerSpawns()  { return this.#currentLayout?.playerSpawns || []; }
  get navigationNodes() { return this.#currentLayout?.navigationNodes || []; }
  get environment() { return this.#currentLayout?.environment || 'arena'; }
  get isConstrainedDevice() { return this.#renderProfile.constrained; }
  get aiInterval() { return this.#renderProfile.aiInterval; }
  get meshDetail() { return this.#renderProfile.meshDetail; }
  get renderProfile() { return this.#renderProfile; }

  constructor(layoutName = 'classic') {
    this.#currentLayout = ARENA_LAYOUTS[layoutName] || ARENA_LAYOUTS.classic;
    this.#initRenderer();
    this.#initScene();
    this.#initCamera();
    this.#initMaterials();
    this.#initLighting();
    this.#buildFloor();
    this.#buildOuterWalls();
    this.buildLayout(layoutName);
  }

  buildLayout(layoutName) {
    this.clearLayout();
    this.#currentLayout = ARENA_LAYOUTS[layoutName] || ARENA_LAYOUTS.classic;
    if (this.#currentLayout.worldBuilder === 'village') {
      const village = new VillageWorld(this.scene, (x, y, z, w, h, d, options = {}) => {
        this.colliders.push({
          min: new THREE.Vector3(x - w / 2, y, z - d / 2),
          max: new THREE.Vector3(x + w / 2, y + h, z + d / 2),
          ...options,
        });
      }, this.#renderProfile.meshDetail);
      this.#proceduralWorld = village;
      this.#layoutMeshes.push(village.group);
      return;
    }
    this.#buildPillars(this.#currentLayout.pillars);
    this.#buildCoverBlocks(this.#currentLayout.coverBlocks);
    this.#buildCrates(this.#currentLayout.crates);
  }

  clearLayout() {
    if (this.#proceduralWorld) {
      this.#proceduralWorld.destroy();
      this.#proceduralWorld = null;
    }
    for (const mesh of this.#layoutMeshes) {
      this.scene.remove(mesh);
      mesh.geometry?.dispose();
    }
    this.#layoutMeshes = [];
    // Remove layout colliders (keep outer walls — first 4)
    this.colliders.splice(4);
  }

  // ── Setup ─────────────────────────────────────────────────

  #initRenderer() {
    const profile = this.#renderProfile;
    this.renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      powerPreference: 'high-performance',
      precision: profile.precision,
      stencil: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.#maxPixelRatio = profile.maxPixelRatio;
    this.#pixelRatio = profile.pixelRatio;
    this.renderer.setPixelRatio(this.#pixelRatio);
    this.renderer.shadowMap.enabled = profile.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = Config.rendering.toneMappingExposure;
    document.body.appendChild(this.renderer.domElement);

    const lostOverlay = document.getElementById('context-lost-overlay');
    this.#lifetime.listen(this.renderer.domElement, 'webglcontextlost', (e) => {
      e.preventDefault();
      if (lostOverlay) lostOverlay.style.display = 'flex';
    });
    this.#lifetime.listen(this.renderer.domElement, 'webglcontextrestored', () => {
      if (lostOverlay) lostOverlay.style.display = 'none';
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  #initScene() {
    this.scene = new THREE.Scene();
    const village = this.environment === 'village';
    const fogColor = village ? 0x9bb0a2 : Config.rendering.fogColor;
    this.scene.background = new THREE.Color(fogColor);
    this.scene.fog = new THREE.FogExp2(fogColor, village ? 0.012 : Config.rendering.fogDensity);
  }

  #initCamera() {
    const fov = PersistenceStore.getFOV();
    this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camera.position.set(0, Config.player.height, 0);
    this.scene.add(this.camera);
  }

  #initMaterials() {
    const village = this.environment === 'village';
    this.#floorMat = new THREE.MeshStandardMaterial({
      color: village ? 0x53773b : 0xffffff,
      map: village ? null : createProceduralTexture({ base: 0x333340, pattern: 'stone', seed: 47, repeat: [14, 14] }),
      roughness: village ? 1 : 0.7, metalness: village ? 0 : 0.2,
    });
    this.#wallMat = new THREE.MeshStandardMaterial({
      color: village ? 0x4e493d : 0xffffff,
      map: village ? null : createProceduralTexture({ base: 0x444455, pattern: 'stone', seed: 53, repeat: [6, 3] }),
      roughness: village ? 1 : 0.6, metalness: village ? 0 : 0.3,
    });
    this.#pillarMat = new THREE.MeshStandardMaterial({
      map: createProceduralTexture({ base: 0x556666, pattern: 'stone', seed: 59, repeat: [3, 5] }),
      roughness: 0.4, metalness: 0.5,
    });
    this.#crateMat = new THREE.MeshStandardMaterial({
      map: createProceduralTexture({ base: 0x886644, pattern: 'wood', seed: 61, repeat: [2, 2] }),
      roughness: 0.8, metalness: 0.1,
    });
  }

  // ── Lighting ──────────────────────────────────────────────

  #initLighting() {
    const r = Config.rendering;
    this.scene.add(new THREE.AmbientLight(r.ambientColor, r.ambientIntensity));
    this.scene.add(new THREE.HemisphereLight(r.hemiSkyColor, r.hemiGroundColor, r.hemiIntensity));

    const dir = new THREE.DirectionalLight(r.dirLightColor, r.dirLightIntensity);
    dir.position.set(20, 30, 10);
    dir.castShadow = this.#renderProfile.shadows;
    const shadowSize = this.#renderProfile.constrained ? 512 : 1536;
    if (dir.castShadow) dir.shadow.mapSize.set(shadowSize, shadowSize);
    dir.shadow.camera.left = dir.shadow.camera.bottom = -40;
    dir.shadow.camera.right = dir.shadow.camera.top = 40;
    this.scene.add(dir);

    if (this.environment === 'village') {
      dir.position.set(-20, 35, -10);
      dir.color.set(0xffe0ad);
      dir.intensity = 2.5;
    } else {
      this.#addAccentLights();
    }
  }

  #addAccentLights() {
    const S = Config.arena.size;
    const colors = [0xff4444, 0x4488ff, 0x44ff88, 0xffaa00];
    const corners = [
      [-S/2 + 3, 5, -S/2 + 3],
      [ S/2 - 3, 5, -S/2 + 3],
      [-S/2 + 3, 5,  S/2 - 3],
      [ S/2 - 3, 5,  S/2 - 3],
    ];
    corners.forEach((pos, i) => {
      const light = new THREE.PointLight(colors[i], 12, 40);
      light.position.set(...pos);
      this.scene.add(light);
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 8, 8),
        new THREE.MeshBasicMaterial({ color: colors[i] }),
      );
      sphere.position.set(...pos);
      this.scene.add(sphere);
    });
  }

  // ── Geometry builders ─────────────────────────────────────

  #buildFloor() {
    if (this.environment === 'village') return;
    const S = Config.arena.size;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(S, S), this.#floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const grid = new THREE.GridHelper(S, 30, 0x222233, 0x222233);
    grid.position.y = 0.01;
    this.scene.add(grid);
  }

  #addWall(x, z, w, d, trackLayout = false) {
    const H = Config.arena.wallHeight;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, H, d), this.#wallMat);
    mesh.position.set(x, H / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    if (trackLayout) this.#layoutMeshes.push(mesh);
    this.colliders.push({
      min: new THREE.Vector3(x - w/2, 0, z - d/2),
      max: new THREE.Vector3(x + w/2, H, z + d/2),
    });
  }

  #buildOuterWalls() {
    const HS = Config.arena.size / 2;
    if (this.environment === 'village') {
      const H = Config.arena.wallHeight;
      this.colliders.push(
        { min: new THREE.Vector3(-HS - 0.5, 0, -HS - 0.5), max: new THREE.Vector3(HS + 0.5, H, -HS + 0.5) },
        { min: new THREE.Vector3(-HS - 0.5, 0, HS - 0.5), max: new THREE.Vector3(HS + 0.5, H, HS + 0.5) },
        { min: new THREE.Vector3(-HS - 0.5, 0, -HS - 0.5), max: new THREE.Vector3(-HS + 0.5, H, HS + 0.5) },
        { min: new THREE.Vector3(HS - 0.5, 0, -HS - 0.5), max: new THREE.Vector3(HS + 0.5, H, HS + 0.5) },
      );
      return;
    }
    this.#addWall(0, -HS, Config.arena.size + 1, 1);
    this.#addWall(0,  HS, Config.arena.size + 1, 1);
    this.#addWall(-HS, 0, 1, Config.arena.size + 1);
    this.#addWall( HS, 0, 1, Config.arena.size + 1);
  }

  #buildPillars(positions) {
    const H = Config.arena.wallHeight;
    (positions || []).forEach(([px, pz]) => {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, H, 8), this.#pillarMat,
      );
      mesh.position.set(px, H / 2, pz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.#layoutMeshes.push(mesh);
      this.colliders.push({
        min: new THREE.Vector3(px - 1.2, 0, pz - 1.2),
        max: new THREE.Vector3(px + 1.2, H, pz + 1.2),
      });
    });
  }

  #buildCoverBlocks(blocks) {
    (blocks || []).forEach(b => this.#addWall(b.x, b.z, b.w, b.d, true));
  }

  #buildCrates(positions) {
    (positions || []).forEach(([cx, cz]) => {
      const s = 1.5 + Math.random();
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), this.#crateMat);
      mesh.position.set(cx, s / 2, cz);
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.#layoutMeshes.push(mesh);
      this.colliders.push({
        min: new THREE.Vector3(cx - s/2, 0, cz - s/2),
        max: new THREE.Vector3(cx + s/2, s, cz + s/2),
      });
    });
  }

  // ── Public helpers ────────────────────────────────────────

  getGroundHeight(x, z) {
    return this.environment === 'village' ? villageGroundHeight(x, z) : 0;
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /** Reduce GPU fill-rate before a sustained slow frame rate becomes a stall. */
  updatePerformance(dt) {
    const sample = Math.min(Math.max(dt, 1 / 240), 0.08);
    this.#frameTimeEMA += (sample - this.#frameTimeEMA) * 0.04;
    this.#qualityTimer += Math.min(dt, 0.25);
    if (this.#qualityTimer < 1.5) return;
    this.#qualityTimer = 0;

    let nextRatio = this.#pixelRatio;
    if (this.#frameTimeEMA > 1 / 43) nextRatio = Math.max(this.#renderProfile.minPixelRatio, this.#pixelRatio - 0.15);
    else if (this.#renderProfile.allowQualityIncrease && this.#frameTimeEMA < 1 / 58) {
      nextRatio = Math.min(this.#maxPixelRatio, this.#pixelRatio + 0.08);
    }
    if (Math.abs(nextRatio - this.#pixelRatio) < 0.01) return;
    this.#pixelRatio = nextRatio;
    this.renderer.setPixelRatio(this.#pixelRatio);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.#destroyed) return;
    this.#destroyed = true;
    this.#lifetime.dispose();
    this.#proceduralWorld?.destroy();
    this.#proceduralWorld = null;
    disposeObject3D(this.scene);
    const materials = [this.#floorMat, this.#wallMat, this.#pillarMat, this.#crateMat];
    const textures = new Set(materials.map(material => material?.map).filter(Boolean));
    for (const texture of textures) texture.dispose();
    this.#floorMat?.dispose();
    this.#wallMat?.dispose();
    this.#pillarMat?.dispose();
    this.#crateMat?.dispose();
    this.scene.clear();
    this.renderer.renderLists?.dispose();
    this.renderer.domElement.remove();
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    this.colliders.length = 0;
    this.#layoutMeshes.length = 0;
  }
}
