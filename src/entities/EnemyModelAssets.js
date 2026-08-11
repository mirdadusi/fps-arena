import * as THREE from 'three';

/**
 * Immutable GPU resources shared by every bot in one game. A five-bot match
 * uploads each mesh and material once instead of five times.
 */
export class EnemyModelAssets {
  #destroyed = false;

  constructor(portraitTexture = null) {
    this.geometries = {
      torso: new THREE.CylinderGeometry(0.42, 0.34, 0.82, 6),
      chestPlate: new THREE.BoxGeometry(0.62, 0.43, 0.12),
      abdomen: new THREE.BoxGeometry(0.42, 0.28, 0.38),
      pelvis: new THREE.CylinderGeometry(0.3, 0.34, 0.22, 6),
      helmet: new THREE.BoxGeometry(0.46, 0.38, 0.48),
      facePlate: new THREE.BoxGeometry(0.36, 0.18, 0.055),
      crest: new THREE.BoxGeometry(0.08, 0.14, 0.36),
      neck: new THREE.CylinderGeometry(0.11, 0.15, 0.18, 8),
      shoulder: new THREE.BoxGeometry(0.34, 0.2, 0.42),
      limb: new THREE.CylinderGeometry(0.085, 0.11, 0.43, 8),
      shin: new THREE.BoxGeometry(0.18, 0.34, 0.2),
      boot: new THREE.BoxGeometry(0.2, 0.12, 0.36),
      backpack: new THREE.BoxGeometry(0.48, 0.62, 0.18),
      exhaust: new THREE.CylinderGeometry(0.055, 0.075, 0.25, 8),
      rifle: new THREE.BoxGeometry(0.16, 0.18, 0.62),
      barrel: new THREE.CylinderGeometry(0.028, 0.04, 0.46, 8),
      optic: new THREE.BoxGeometry(0.08, 0.08, 0.16),
      core: new THREE.OctahedronGeometry(0.095, 0),
      portrait: new THREE.PlaneGeometry(0.34, 0.28),
    };

    this.materials = {
      frame: new THREE.MeshStandardMaterial({ color: 0x171b20, roughness: 0.3, metalness: 0.85 }),
      armor: new THREE.MeshStandardMaterial({ color: 0x3b424a, roughness: 0.48, metalness: 0.62 }),
      armorDark: new THREE.MeshStandardMaterial({ color: 0x242a31, roughness: 0.55, metalness: 0.58 }),
      accent: new THREE.MeshStandardMaterial({ color: 0x9d231d, roughness: 0.34, metalness: 0.68 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xb79252, roughness: 0.3, metalness: 0.88 }),
      visor: new THREE.MeshStandardMaterial({
        color: 0x2a0908, emissive: 0xff321d, emissiveIntensity: 2.3,
        roughness: 0.18, metalness: 0.35,
      }),
      glow: new THREE.MeshBasicMaterial({ color: 0xff4a25, toneMapped: false }),
      weapon: new THREE.MeshStandardMaterial({ color: 0x111418, roughness: 0.22, metalness: 0.92 }),
      portrait: portraitTexture ? new THREE.MeshBasicMaterial({
        map: portraitTexture, toneMapped: false,
      }) : null,
    };
  }

  dispose() {
    if (this.#destroyed) return;
    this.#destroyed = true;
    for (const geometry of Object.values(this.geometries)) geometry.dispose();
    for (const material of Object.values(this.materials)) material?.dispose();
  }
}
