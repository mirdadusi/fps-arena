import * as THREE from 'three';

function channel(hex, shift) {
  return (hex >> shift) & 0xff;
}

function hash(x, y, seed) {
  let value = Math.imul(x + seed * 31, 374761393) ^ Math.imul(y + seed * 17, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 0xffffffff;
}

/** Create a tiny, deterministic tileable surface texture without network IO. */
export function createProceduralTexture({ base, variation = 24, pattern = 'noise', seed = 1, repeat = [4, 4] }) {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  const baseR = channel(base, 16);
  const baseG = channel(base, 8);
  const baseB = channel(base, 0);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const noise = hash(x, y, seed) - 0.5;
      let detail = noise * variation;
      if (pattern === 'wood') detail += Math.sin((x + Math.sin(y * 0.24) * 5) * 0.42) * variation * 0.45;
      else if (pattern === 'stone') detail += (hash(x >> 2, y >> 2, seed + 4) - 0.5) * variation * 0.9;
      else if (pattern === 'grass') detail += ((x + y * 3 + seed) % 11 === 0 ? variation * 0.8 : 0);
      else if (pattern === 'plaster') detail += Math.sin(x * 0.18 + y * 0.11) * variation * 0.25;
      else if (pattern === 'roof') detail += (x % 16 < 2 || y % 12 < 2) ? -variation * 0.75 : variation * 0.12;
      else if (pattern === 'hay') detail += Math.sin((x + y) * 0.7) * variation * 0.4;

      const index = (y * size + x) * 4;
      data[index] = THREE.MathUtils.clamp(baseR + detail, 0, 255);
      data[index + 1] = THREE.MathUtils.clamp(baseG + detail * 0.9, 0, 255);
      data[index + 2] = THREE.MathUtils.clamp(baseB + detail * 0.72, 0, 255);
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}
