import * as THREE from 'three';
import { Config } from '../Config.js';

/**
 * GrenadeSystem — throwable grenades with arc trajectory, bounce, and explosion.
 */
export class GrenadeSystem {
  #grenades = [];
  #explosions = [];
  #scene;
  #physics;
  #geo = new THREE.SphereGeometry(0.12, 8, 8);
  #mat = new THREE.MeshStandardMaterial({ color: 0x446644, roughness: 0.5, metalness: 0.3 });

  count = Config.grenade.maxCount;

  constructor(scene, physics) {
    this.#scene = scene;
    this.#physics = physics;
  }

  throw(origin, direction, yaw, pitch) {
    if (this.count <= 0) return false;
    this.count--;

    const mesh = new THREE.Mesh(this.#geo, this.#mat);
    mesh.position.copy(origin);
    mesh.castShadow = true;
    this.#scene.add(mesh);

    // Indicator ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.12, 12),
      new THREE.MeshBasicMaterial({ color: 0xff4444, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    mesh.add(ring);

    const force = Config.grenade.throwForce;
    const velocity = direction.clone().multiplyScalar(force);
    velocity.y = force * 0.5;

    this.#grenades.push({
      mesh,
      velocity,
      life: Config.grenade.fuseTime,
      bounced: false,
    });
    return true;
  }

  update(dt, playerPos, enemies, remotePlayers) {
    const results = { playerDamage: 0, enemyHits: [], remoteHits: [], explosionCount: 0 };

    // Update grenades
    for (let i = this.#grenades.length - 1; i >= 0; i--) {
      const g = this.#grenades[i];
      g.velocity.y -= Config.physics.gravity * dt;
      g.mesh.position.add(g.velocity.clone().multiplyScalar(dt));
      g.mesh.rotation.x += dt * 5;
      g.mesh.rotation.z += dt * 3;
      g.life -= dt;

      // Bounce off floor
      if (g.mesh.position.y <= 0.12) {
        g.mesh.position.y = 0.12;
        g.velocity.y = Math.abs(g.velocity.y) * Config.grenade.bounceDecay;
        g.velocity.x *= 0.7;
        g.velocity.z *= 0.7;
      }

      // Bounce off walls
      if (this.#physics.pointInsideWall(g.mesh.position)) {
        g.velocity.x *= -0.5;
        g.velocity.z *= -0.5;
      }

      // Clamp to arena
      const bound = Config.arena.size / 2 - 1;
      if (Math.abs(g.mesh.position.x) > bound) {
        g.mesh.position.x = Math.sign(g.mesh.position.x) * bound;
        g.velocity.x *= -0.5;
      }
      if (Math.abs(g.mesh.position.z) > bound) {
        g.mesh.position.z = Math.sign(g.mesh.position.z) * bound;
        g.velocity.z *= -0.5;
      }

      // Explode
      if (g.life <= 0) {
        this.#explode(g.mesh.position, playerPos, enemies, remotePlayers, results);
        this.#scene.remove(g.mesh);
        this.#grenades.splice(i, 1);
      }
    }

    // Update explosions (visual only)
    for (let i = this.#explosions.length - 1; i >= 0; i--) {
      const e = this.#explosions[i];
      e.life -= dt;
      const scale = 1 + (1 - e.life / e.maxLife) * 3;
      e.mesh.scale.setScalar(scale);
      e.mesh.material.opacity = e.life / e.maxLife;
      e.light.intensity = (e.life / e.maxLife) * 20;
      if (e.life <= 0) {
        this.#scene.remove(e.mesh);
        this.#scene.remove(e.light);
        this.#explosions.splice(i, 1);
      }
    }

    return results;
  }

  #explode(pos, playerPos, enemies, remotePlayers, results) {
    // Visual explosion
    const explosionMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 1 }),
    );
    explosionMesh.position.copy(pos);
    this.#scene.add(explosionMesh);

    const light = new THREE.PointLight(0xff6600, 20, 15);
    light.position.copy(pos);
    this.#scene.add(light);

    this.#explosions.push({ mesh: explosionMesh, light, life: 0.5, maxLife: 0.5 });

    results.explosionCount++;

    const radius = Config.grenade.radius;
    const maxDmg = Config.grenade.damage;

    // Damage player
    const distPlayer = pos.distanceTo(playerPos);
    if (distPlayer < radius) {
      const dmg = Math.round(maxDmg * (1 - distPlayer / radius));
      results.playerDamage += dmg;
    }

    // Damage enemies (bots)
    for (const bot of enemies) {
      if (!bot.enemy.alive) continue;
      const wp = new THREE.Vector3();
      bot.enemy.group.getWorldPosition(wp);
      const dist = pos.distanceTo(wp);
      if (dist < radius) {
        const dmg = Math.round(maxDmg * (1 - dist / radius));
        results.enemyHits.push({ bot, damage: dmg });
      }
    }

    // Damage remote players
    for (const [id, rp] of remotePlayers) {
      if (!rp.alive) continue;
      const dist = pos.distanceTo(rp.position);
      if (dist < radius) {
        const dmg = Math.round(maxDmg * (1 - dist / radius));
        results.remoteHits.push({ id, rp, damage: dmg });
      }
    }
  }

  reset() {
    for (const g of this.#grenades) this.#scene.remove(g.mesh);
    this.#grenades.length = 0;
    for (const e of this.#explosions) {
      this.#scene.remove(e.mesh);
      this.#scene.remove(e.light);
    }
    this.#explosions.length = 0;
    this.count = Config.grenade.maxCount;
  }

  clearAll() { this.reset(); }
}
