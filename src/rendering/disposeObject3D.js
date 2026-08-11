/** Material properties which can hold a GPU-backed texture. */
const TEXTURE_KEYS = [
  'map', 'alphaMap', 'aoMap', 'bumpMap', 'displacementMap', 'emissiveMap',
  'envMap', 'lightMap', 'metalnessMap', 'normalMap', 'roughnessMap',
  'specularMap', 'gradientMap', 'clearcoatMap', 'clearcoatNormalMap',
  'clearcoatRoughnessMap', 'iridescenceMap', 'iridescenceThicknessMap',
  'sheenColorMap', 'sheenRoughnessMap', 'transmissionMap', 'thicknessMap',
];

/**
 * Releases every unique geometry, material and texture below an Object3D.
 * Shared resources are disposed once, even when many meshes reference them.
 */
export function disposeObject3D(root, { disposeTextures = true } = {}) {
  if (!root?.traverse) return;
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();

  root.traverse((object) => {
    if (object.geometry?.dispose) geometries.add(object.geometry);
    const list = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of list) {
      if (!material?.dispose) continue;
      materials.add(material);
      if (!disposeTextures) continue;
      for (const key of TEXTURE_KEYS) {
        if (material[key]?.isTexture) textures.add(material[key]);
      }
      for (const value of Object.values(material.uniforms || {})) {
        if (value?.value?.isTexture) textures.add(value.value);
      }
    }
  });

  for (const texture of textures) texture.dispose();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
}
