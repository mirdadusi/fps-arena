import { Config } from '../Config.js';

/**
 * Minimap — top-down 2D canvas overlay showing player, enemies, remote players, and pickups.
 *
 * Pattern: Passive View — redrawn each frame from external state.
 */
export class Minimap {
  #ctx;
  #w;
  #h;
  #scale;

  constructor() {
    const canvas = document.getElementById('minimap');
    this.#ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 140;
    this.#w = this.#h = 140;
    this.#scale = 140 / Config.arena.size;
  }

  /**
   * @param {Array} colliders  Wall colliders
   * @param {THREE.Vector3} playerPos
   * @param {number} playerYaw
   * @param {Array<{x,z,color}>} entities  All enemies + remote players
   * @param {Array<{x,z,color}>} pickups   Active pickup positions
   */
  draw(colliders, playerPos, playerYaw, entities = [], pickups = []) {
    const ctx = this.#ctx;
    const s = this.#scale;
    const half = Config.arena.size / 2;
    ctx.clearRect(0, 0, this.#w, this.#h);

    // Walls
    ctx.fillStyle = 'rgba(80, 80, 100, 0.7)';
    for (const box of colliders) {
      ctx.fillRect(
        (box.min.x + half) * s,
        (box.min.z + half) * s,
        (box.max.x - box.min.x) * s,
        (box.max.z - box.min.z) * s,
      );
    }

    // Pickups (small colored diamonds)
    for (const p of pickups) {
      const px = (p.x + half) * s;
      const pz = (p.z + half) * s;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(px, pz - 2.5);
      ctx.lineTo(px + 2.5, pz);
      ctx.lineTo(px, pz + 2.5);
      ctx.lineTo(px - 2.5, pz);
      ctx.fill();
    }

    // Player dot + direction
    const px = (playerPos.x + half) * s;
    const pz = (playerPos.z + half) * s;
    ctx.fillStyle = '#4f4';
    ctx.beginPath();
    ctx.arc(px, pz, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4f4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, pz);
    ctx.lineTo(px - Math.sin(playerYaw) * 8, pz - Math.cos(playerYaw) * 8);
    ctx.stroke();

    // Entity dots (enemies + remote players)
    for (const ent of entities) {
      const ex = (ent.x + half) * s;
      const ez = (ent.z + half) * s;
      ctx.fillStyle = ent.color || '#f44';
      ctx.beginPath();
      ctx.arc(ex, ez, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
