import * as THREE from 'three';
import { Config } from '../Config.js';

/**
 * EnemyAI — State-machine controlling enemy behavior.
 *
 * Pattern: State pattern — each state (patrol, chase, strafe, flank, dodge,
 * cover, retreat) determines movement direction. Transitions happen on timer
 * or distance/HP triggers.
 * Shooting uses burst-fire governed by the current DifficultyProfile.
 */
export class EnemyAI {
  state = 'patrol';
  stateTimer = 0;
  strafeDir = 1;
  fireCooldown = 0;
  burstRemaining = 0;
  burstCooldown = 0;

  #patrolTarget = new THREE.Vector3();
  #coverPoints  = [];
  #coverTarget  = null;

  /**
   * @param {import('../entities/Enemy.js').Enemy} enemy
   * @param {import('../systems/PhysicsSystem.js').PhysicsSystem} physics
   */
  constructor(enemy, physics) {
    this.enemy = enemy;
    this.physics = physics;
  }

  /** @param {{x:number,z:number}[]} points */
  setCoverPoints(points) {
    this.#coverPoints = points ?? [];
  }

  /**
   * Tick the AI. Returns an array of shoot-direction vectors (may be empty).
   * @param {number} dt
   * @param {THREE.Vector3} playerPos
   * @param {object} diff  difficulty profile from DifficultyManager
   * @returns {THREE.Vector3[]} shoot directions (world space)
   */
  update(dt, playerPos, diff) {
    if (!this.enemy.alive) return [];

    const enemyPos = this.enemy.position;
    const toPlayer = new THREE.Vector3().subVectors(playerPos, enemyPos);
    const dist = toPlayer.length();
    toPlayer.normalize();

    // ── Retreat trigger (overrides normal transitions) ──
    if (
      diff.retreatEnabled &&
      this.enemy.hp < Config.enemy.retreatHPThreshold &&
      this.state !== 'retreat' &&
      this.state !== 'cover'
    ) {
      this.state = 'retreat';
      this.stateTimer = 3.0;
      this.#pickNearestCover(enemyPos);
    }

    // ── Face the player ──
    const tgt = Math.atan2(toPlayer.x, toPlayer.z);
    let angleDiff = tgt - this.enemy.group.rotation.y;
    while (angleDiff > Math.PI)  angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    this.enemy.group.rotation.y += angleDiff * (5 + diff.tier * 2) * dt;

    const canSee = this.physics.hasLineOfSight(
      new THREE.Vector3(enemyPos.x, 1.5, enemyPos.z),
      new THREE.Vector3(playerPos.x, Config.player.height, playerPos.z),
    );

    // ── State transitions ──
    this.stateTimer -= dt;
    if (this.stateTimer <= 0) this.#transitionState(dist, diff, canSee);

    // ── Movement ──
    const moveDir = this.#getMoveDirection(toPlayer, dist, enemyPos);
    const spd = this.state === 'dodge' ? diff.enemySpeed * 2 : diff.enemySpeed;
    if (moveDir.length() > 0) moveDir.normalize();
    enemyPos.add(moveDir.multiplyScalar(spd * dt));
    this.physics.resolveCollision(enemyPos, Config.enemy.radius);

    const bound = Config.arena.size / 2 - 1.5;
    enemyPos.x = Math.max(-bound, Math.min(bound, enemyPos.x));
    enemyPos.z = Math.max(-bound, Math.min(bound, enemyPos.z));

    // ── Shooting (halved in cover state) ──
    return this.#handleShooting(dt, toPlayer, dist, canSee, diff, enemyPos);
  }

  reset() {
    this.state = 'patrol';
    this.stateTimer = 0;
    this.burstRemaining = 0;
    this.fireCooldown = 0;
    this.#coverTarget = null;
  }

  // ── Private: nearest cover helper ─────────────────────────

  #pickNearestCover(enemyPos) {
    const radius = Config.enemy.coverSeekRadius;
    let best = null;
    let bestDist = Infinity;
    for (const pt of this.#coverPoints) {
      const dx = pt.x - enemyPos.x;
      const dz = pt.z - enemyPos.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < radius && d < bestDist) { bestDist = d; best = pt; }
    }
    this.#coverTarget = best;
  }

  // ── Private: state transitions ────────────────────────────

  #transitionState(dist, diff, canSee) {
    // cover state: triggered by low HP or random chance while strafing
    if (
      diff.coverChance > 0 &&
      canSee &&
      this.state === 'strafe' &&
      Math.random() < diff.coverChance
    ) {
      this.#pickNearestCover(this.enemy.position);
      if (this.#coverTarget) {
        this.state = 'cover';
        this.stateTimer = 1.5 + Math.random() * 1.5;
        return;
      }
    }

    // retreat → cover transition: arrived at cover
    if (this.state === 'retreat') {
      this.state = 'cover';
      this.stateTimer = 3.0;
      return;
    }

    // cover → re-engage
    if (this.state === 'cover') {
      this.state = 'chase';
      this.stateTimer = 1.0 + Math.random();
      this.#coverTarget = null;
      return;
    }

    if (dist > 25) {
      this.state = 'chase';
      this.stateTimer = 1.5 + Math.random() * 1.5;
      return;
    }
    if (dist < 6) {
      if (Math.random() < diff.dodgeChance * 2) {
        this.state = 'dodge';
        this.strafeDir = Math.random() > 0.5 ? 1 : -1;
        this.stateTimer = 0.4 + Math.random() * 0.3;
      } else {
        this.state = 'strafe';
        this.strafeDir = Math.random() > 0.5 ? 1 : -1;
        this.stateTimer = 1 + Math.random();
      }
      return;
    }

    const r = Math.random();
    if (r < 0.3) {
      this.state = 'chase';
      this.stateTimer = 1 + Math.random() * 1.5;
    } else if (r < 0.55) {
      this.state = 'strafe';
      this.strafeDir = Math.random() > 0.5 ? 1 : -1;
      this.stateTimer = 1.5 + Math.random() * 1.5;
    } else if (r < 0.75 && diff.tier >= 1) {
      this.state = 'flank';
      this.strafeDir = Math.random() > 0.5 ? 1 : -1;
      this.stateTimer = 2 + Math.random() * 2;
    } else if (r < 0.85 && diff.tier >= 2) {
      this.state = 'dodge';
      this.strafeDir = Math.random() > 0.5 ? 1 : -1;
      this.stateTimer = 0.5 + Math.random() * 0.4;
    } else {
      this.state = 'patrol';
      this.#patrolTarget.set(
        (Math.random() - 0.5) * (Config.arena.size - 6), 0,
        (Math.random() - 0.5) * (Config.arena.size - 6),
      );
      this.stateTimer = 2 + Math.random() * 2;
    }
  }

  // ── Private: movement per state ───────────────────────────

  #getMoveDirection(toPlayer, dist, enemyPos) {
    const dir = new THREE.Vector3();
    switch (this.state) {
      case 'chase':
        dir.copy(toPlayer);
        break;
      case 'strafe': {
        const perp = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x);
        dir.copy(perp).multiplyScalar(this.strafeDir);
        if (dist > 12) dir.add(toPlayer.clone().multiplyScalar(0.4));
        break;
      }
      case 'flank': {
        const perp = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x);
        dir.copy(perp).multiplyScalar(this.strafeDir * 0.7);
        dir.add(toPlayer.clone().multiplyScalar(0.5));
        break;
      }
      case 'dodge': {
        const perp = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x);
        dir.copy(perp).multiplyScalar(this.strafeDir);
        break;
      }
      case 'patrol': {
        const toTgt = new THREE.Vector3().subVectors(this.#patrolTarget, enemyPos);
        toTgt.y = 0;
        if (toTgt.length() < 2) this.stateTimer = 0;
        dir.copy(toTgt).normalize();
        break;
      }
      case 'cover': {
        if (this.#coverTarget) {
          const toCover = new THREE.Vector3(
            this.#coverTarget.x - enemyPos.x, 0,
            this.#coverTarget.z - enemyPos.z,
          );
          if (toCover.length() < 2) { this.stateTimer = 0; break; }
          dir.copy(toCover).normalize();
        }
        break;
      }
      case 'retreat': {
        // Move away from player; also steer toward nearest cover
        dir.copy(toPlayer).multiplyScalar(-1);
        if (this.#coverTarget) {
          const toCover = new THREE.Vector3(
            this.#coverTarget.x - enemyPos.x, 0,
            this.#coverTarget.z - enemyPos.z,
          );
          if (toCover.length() < 2) {
            this.stateTimer = 0; // arrived — will transition to cover
          } else {
            dir.add(toCover.normalize().multiplyScalar(0.6));
          }
        }
        break;
      }
    }
    dir.y = 0;
    return dir;
  }

  // ── Private: shooting / burst ─────────────────────────────

  #handleShooting(dt, toPlayer, dist, canSee, diff, enemyPos) {
    /** @type {THREE.Vector3[]} */
    const shots = [];

    this.fireCooldown -= dt;
    this.burstCooldown -= dt;

    // Fire rate halved while in cover (reloading behaviour)
    const fireRateMod = this.state === 'cover' ? 2 : 1;

    // Fire burst bullets
    if (this.burstRemaining > 0 && this.burstCooldown <= 0 && canSee) {
      this.burstRemaining--;
      this.burstCooldown = 0.1;
      const dir = this.#aimWithSpread(toPlayer, diff.accuracy);
      shots.push(dir);
    }

    // Start new burst
    if (this.fireCooldown <= 0 && dist < Config.enemy.range && canSee) {
      this.fireCooldown = (diff.fireRate + Math.random() * 0.2) * fireRateMod;
      this.burstRemaining = diff.burstCount;
      this.burstCooldown = 0;
    }

    return shots;
  }

  #aimWithSpread(toPlayer, accuracy) {
    const dir = toPlayer.clone();
    dir.x += (Math.random() - 0.5) * accuracy;
    dir.y += (Math.random() - 0.5) * accuracy * 0.4;
    dir.z += (Math.random() - 0.5) * accuracy;
    return dir.normalize();
  }
}

