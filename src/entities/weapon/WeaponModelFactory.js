import * as THREE from 'three';
import { Config } from '../../Config.js';

function makeMaterials(accentColor) {
  return {
    metal: new THREE.MeshStandardMaterial({ color: 0x17191d, metalness: 0.88, roughness: 0.24 }),
    metal2: new THREE.MeshStandardMaterial({ color: 0x363b42, metalness: 0.78, roughness: 0.3 }),
    accent: new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 0.12, metalness: 0.62, roughness: 0.32 }),
    polymer: new THREE.MeshStandardMaterial({ color: 0x252629, metalness: 0.12, roughness: 0.68 }),
    lens: new THREE.MeshPhysicalMaterial({ color: 0x182b35, emissive: 0x103344, emissiveIntensity: 0.4, metalness: 0.2, roughness: 0.08, clearcoat: 1 }),
  };
}

function add(group, geometry, material, position, rotation = null, scale = null) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (rotation) mesh.rotation.set(...rotation);
  if (scale) mesh.scale.set(...scale);
  group.add(mesh);
  return mesh;
}

function barrel(group, material, radius, length, z) {
  return add(group, new THREE.CylinderGeometry(radius, radius * 1.08, length, 12), material,
    [0, 0, z], [Math.PI / 2, 0, 0]);
}

function addSight(group, materials, z, magnified = false) {
  add(group, new THREE.BoxGeometry(magnified ? 0.12 : 0.08, 0.025, magnified ? 0.32 : 0.16), materials.metal2, [0, 0.105, z]);
  const sight = add(group,
    new THREE.CylinderGeometry(magnified ? 0.055 : 0.04, magnified ? 0.055 : 0.04, magnified ? 0.28 : 0.08, 12),
    materials.metal, [0, 0.16, z], [Math.PI / 2, 0, 0]);
  add(sight, new THREE.CircleGeometry(magnified ? 0.047 : 0.034, 16), materials.lens,
    [0, magnified ? -0.145 : -0.045, 0], [Math.PI / 2, 0, 0]);
}

function addGrip(group, materials, z) {
  add(group, new THREE.BoxGeometry(0.095, 0.23, 0.12), materials.polymer,
    [0, -0.165, z], [-0.18, 0, 0]);
  add(group, new THREE.TorusGeometry(0.052, 0.012, 6, 12, Math.PI), materials.metal2,
    [0, -0.105, z - 0.075], [Math.PI / 2, 0, 0]);
}

function buildRifle(group, m) {
  add(group, new THREE.BoxGeometry(0.15, 0.16, 0.58), m.metal2, [0, -0.015, -0.22]);
  add(group, new THREE.BoxGeometry(0.13, 0.11, 0.35), m.polymer, [0, 0, -0.61]);
  barrel(group, m.metal, 0.024, 0.43, -0.84);
  add(group, new THREE.CylinderGeometry(0.035, 0.028, 0.1, 10), m.accent, [0, 0, -1.1], [Math.PI / 2, 0, 0]);
  add(group, new THREE.BoxGeometry(0.115, 0.07, 0.3), m.polymer, [0, 0.01, 0.2]);
  add(group, new THREE.BoxGeometry(0.09, 0.16, 0.18), m.polymer, [0, -0.035, 0.38], [0.08, 0, 0]);
  add(group, new THREE.BoxGeometry(0.09, 0.24, 0.13), m.accent, [0, -0.17, -0.24], [-0.12, 0, 0]);
  add(group, new THREE.BoxGeometry(0.075, 0.035, 0.28), m.metal, [0, 0.095, -0.18]);
  addGrip(group, m, 0.02);
  addSight(group, m, -0.22, false);
  group.userData.muzzleZ = -1.16;
}

function buildShotgun(group, m) {
  add(group, new THREE.BoxGeometry(0.16, 0.16, 0.54), m.metal2, [0, -0.02, -0.2]);
  barrel(group, m.metal, 0.036, 0.72, -0.73);
  barrel(group, m.accent, 0.03, 0.54, -0.62).position.y = -0.075;
  add(group, new THREE.BoxGeometry(0.145, 0.105, 0.28), m.polymer, [0, -0.06, -0.54]);
  add(group, new THREE.BoxGeometry(0.115, 0.1, 0.42), m.polymer, [0, -0.01, 0.26]);
  add(group, new THREE.BoxGeometry(0.13, 0.22, 0.18), m.polymer, [0, -0.055, 0.52], [0.05, 0, 0]);
  addGrip(group, m, 0.0);
  add(group, new THREE.BoxGeometry(0.04, 0.04, 0.3), m.accent, [0, 0.1, -0.27]);
  add(group, new THREE.CylinderGeometry(0.048, 0.04, 0.08, 12), m.metal, [0, 0, -1.12], [Math.PI / 2, 0, 0]);
  group.userData.muzzleZ = -1.17;
}

function buildSniper(group, m) {
  add(group, new THREE.BoxGeometry(0.125, 0.13, 0.68), m.metal2, [0, -0.02, -0.28]);
  barrel(group, m.metal, 0.022, 0.82, -0.98);
  add(group, new THREE.CylinderGeometry(0.04, 0.032, 0.2, 12), m.accent, [0, 0, -1.49], [Math.PI / 2, 0, 0]);
  add(group, new THREE.BoxGeometry(0.105, 0.08, 0.48), m.polymer, [0, -0.01, 0.34]);
  add(group, new THREE.BoxGeometry(0.12, 0.2, 0.24), m.polymer, [0, -0.035, 0.68], [0.05, 0, 0]);
  add(group, new THREE.BoxGeometry(0.075, 0.2, 0.12), m.accent, [0, -0.16, -0.2], [-0.06, 0, 0]);
  addGrip(group, m, 0.08);
  addSight(group, m, -0.2, true);
  const bolt = barrel(group, m.metal, 0.018, 0.16, -0.02);
  bolt.rotation.z = Math.PI / 2;
  bolt.position.x = 0.1;
  group.userData.muzzleZ = -1.61;
}

function buildRocket(group, m) {
  barrel(group, m.metal2, 0.085, 0.9, -0.35);
  add(group, new THREE.CylinderGeometry(0.105, 0.09, 0.18, 14), m.accent, [0, 0, -0.88], [Math.PI / 2, 0, 0]);
  add(group, new THREE.CylinderGeometry(0.11, 0.09, 0.2, 14), m.metal, [0, 0, 0.18], [Math.PI / 2, 0, 0]);
  add(group, new THREE.BoxGeometry(0.12, 0.11, 0.36), m.polymer, [0, -0.095, -0.18]);
  addGrip(group, m, -0.02);
  add(group, new THREE.BoxGeometry(0.07, 0.16, 0.22), m.metal, [0, 0.13, -0.28]);
  add(group, new THREE.CylinderGeometry(0.045, 0.045, 0.16, 12), m.lens, [0, 0.18, -0.28], [Math.PI / 2, 0, 0]);
  [-1, 1].forEach(side => add(group, new THREE.BoxGeometry(0.035, 0.18, 0.22), m.accent, [side * 0.095, 0, -0.82], [0, 0, side * 0.25]));
  group.userData.muzzleZ = -1.0;
}

/** Build a detailed, distinct first-person model for a configured weapon. */
export function createWeaponModel(key) {
  const group = new THREE.Group();
  const materials = makeMaterials(Config.weapons[key].bulletColor);
  if (key === 'rifle') buildRifle(group, materials);
  else if (key === 'shotgun') buildShotgun(group, materials);
  else if (key === 'sniper') buildSniper(group, materials);
  else buildRocket(group, materials);
  group.traverse(object => { if (object.isMesh) object.castShadow = true; });
  return group;
}
