import * as THREE from 'three';
import { Config } from '../Config.js';

const EMPTY_SHOTS = Object.freeze([]);

/** Keep an angle inside [-PI, PI]. */
function shortestAngle(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

/**
 * Tactical bot controller with perception, short-term memory and predictive aim.
 *
 * All Vector3 instances are allocated once per bot. update() reuses them, so
 * five bots at 60 fps no longer produce thousands of temporary objects.
 */
export class EnemyAI {
  state = 'patrol';
  stateTimer = 0;
  strafeDir = 1;
  fireCooldown = 0;
  burstRemaining = 0;
  burstCooldown = 0;

  #coverPoints = [];
  #hasCoverTarget = false;
  #lastHP = Config.enemy.maxHP;
  #underFireTimer = 0;
  #sightMemory = 0;
  #reactionTimer = 0;
  #decisionTimer = 0;
  #stuckTimer = 0;
  #hadPlayerSample = false;
  #wasVisible = false;
  #noiseMemory = 0;
  #navigationGraph = null;
  #hasRoute = false;
  #routeTimer = 0;

  // Persistent scratch state. Do not return these except #shotDirection, which
  // Game consumes synchronously before the next update.
  #patrolTarget = new THREE.Vector3();
  #coverTarget = new THREE.Vector3();
  #lastKnownPlayer = new THREE.Vector3();
  #previousPlayer = new THREE.Vector3();
  #playerVelocity = new THREE.Vector3();
  #toPlayer = new THREE.Vector3();
  #moveDirection = new THREE.Vector3();
  #perpendicular = new THREE.Vector3();
  #separation = new THREE.Vector3();
  #probe = new THREE.Vector3();
  #leftCandidate = new THREE.Vector3();
  #rightCandidate = new THREE.Vector3();
  #enemyEye = new THREE.Vector3();
  #playerEye = new THREE.Vector3();
  #coverEye = new THREE.Vector3();
  #predictedTarget = new THREE.Vector3();
  #shotDirection = new THREE.Vector3();
  #shots = [];
  #lastPosition = new THREE.Vector3();
  #investigateTarget = new THREE.Vector3();
  #routeWaypoint = new THREE.Vector3();
  #routeGoal = new THREE.Vector3();

  /**
   * @param {import('../entities/Enemy.js').Enemy} enemy
   * @param {import('../systems/PhysicsSystem.js').PhysicsSystem} physics
   */
  constructor(enemy, physics) {
    this.enemy = enemy;
    this.physics = physics;
    this.#choosePatrolTarget();
    this.#lastPosition.copy(enemy.position);
  }

  /** @param {{x:number,z:number}[]} points */
  setCoverPoints(points) {
    this.#coverPoints = (points ?? []).filter(point =>
      Number.isFinite(point?.x) && Number.isFinite(point?.z));
  }

  setNavigationGraph(graph) {
    this.#navigationGraph = graph;
    this.#hasRoute = false;
  }

  /** Sound is imperfect information: bots investigate it, but do not aim at it. */
  hearNoise(position, intensity = 1) {
    if (!this.enemy.alive) return;
    const hearing = Config.enemy.ai.hearingRange * Math.max(0, intensity);
    const dx = position.x - this.enemy.position.x;
    const dz = position.z - this.enemy.position.z;
    if (dx * dx + dz * dz > hearing * hearing) return;
    this.#investigateTarget.copy(position);
    this.#noiseMemory = Config.enemy.ai.investigateDuration;
    if (!this.#wasVisible) this.#setState('investigate', Config.enemy.ai.investigateDuration);
    this.#hasRoute = false;
  }

  /**
   * @param {number} dt
   * @param {THREE.Vector3} playerPos
   * @param {object} diff difficulty profile
   * @param {Array<{enemy:object}>|null} allies
   * @returns {THREE.Vector3[]} shared shot list, consumed synchronously
   */
  update(dt, playerPos, diff, allies = null) {
    if (!this.enemy.alive) return EMPTY_SHOTS;
    this.#shots.length = 0;
    this.#noiseMemory = Math.max(0, this.#noiseMemory - dt);
    this.#routeTimer -= dt;

    const ai = Config.enemy.ai;
    const enemyPos = this.enemy.position;
    this.#samplePlayerVelocity(playerPos, dt);

    this.#toPlayer.subVectors(playerPos, enemyPos);
    this.#toPlayer.y = 0;
    const distanceSq = this.#toPlayer.lengthSq();
    const distance = Math.sqrt(distanceSq);
    if (distance > 0.0001) this.#toPlayer.multiplyScalar(1 / distance);

    this.#enemyEye.set(enemyPos.x, enemyPos.y + ai.eyeHeight, enemyPos.z);
    this.#playerEye.copy(playerPos);
    const canSee = this.physics.hasLineOfSight(this.#enemyEye, this.#playerEye);

    if (canSee) {
      this.#lastKnownPlayer.copy(playerPos);
      this.#sightMemory = ai.sightMemory;
      if (!this.#wasVisible) this.#reactionTimer = diff.reactionTime;
    } else {
      this.#sightMemory = Math.max(0, this.#sightMemory - dt);
    }
    this.#wasVisible = canSee;
    this.#reactionTimer = Math.max(0, this.#reactionTimer - dt);

    const tookDamage = this.enemy.hp < this.#lastHP;
    this.#lastHP = this.enemy.hp;
    if (tookDamage) this.#underFireTimer = ai.underFireMemory;
    else this.#underFireTimer = Math.max(0, this.#underFireTimer - dt);

    this.stateTimer -= dt;
    this.#decisionTimer -= dt;
    this.#updateStuckDetection(dt);
    if (this.#decisionTimer <= 0 || this.stateTimer <= 0 || tookDamage) {
      this.#chooseTactic(distance, canSee, tookDamage, diff);
      this.#decisionTimer = ai.decisionMin + Math.random() * (ai.decisionMax - ai.decisionMin);
    }

    this.#turnToward(canSee ? playerPos : this.#lastKnownPlayer, dt, diff);
    this.#computeMovement(distance, canSee);
    this.#applySeparation(allies);
    this.#avoidObstacles();

    if (this.#moveDirection.lengthSq() > 0.0001) {
      this.#moveDirection.normalize();
      const speedScale = this.state === 'dodge' ? ai.dodgeSpeedMultiplier
        : this.state === 'retreat' ? ai.retreatSpeedMultiplier
          : this.state === 'holdCover' ? 0 : 1;
      enemyPos.addScaledVector(this.#moveDirection, diff.enemySpeed * speedScale * dt);
      this.physics.resolveCollision(enemyPos, Config.enemy.radius, enemyPos.y, 2.15);
    }

    const bound = Config.arena.size / 2 - 1.5;
    enemyPos.x = Math.max(-bound, Math.min(bound, enemyPos.x));
    enemyPos.z = Math.max(-bound, Math.min(bound, enemyPos.z));
    enemyPos.y = this.#groundHeightAt(enemyPos.x, enemyPos.z);

    this.#handleShooting(dt, playerPos, distance, canSee, diff);
    return this.#shots;
  }

  reset() {
    this.state = 'patrol';
    this.stateTimer = 0;
    this.fireCooldown = 0;
    this.burstRemaining = 0;
    this.burstCooldown = 0;
    this.#hasCoverTarget = false;
    this.#lastHP = this.enemy.hp;
    this.#underFireTimer = 0;
    this.#sightMemory = 0;
    this.#reactionTimer = 0;
    this.#decisionTimer = 0;
    this.#stuckTimer = 0;
    this.#hadPlayerSample = false;
    this.#wasVisible = false;
    this.#noiseMemory = 0;
    this.#hasRoute = false;
    this.#routeTimer = 0;
    this.#lastPosition.copy(this.enemy.position);
    this.#choosePatrolTarget();
  }

  #samplePlayerVelocity(playerPos, dt) {
    if (this.#hadPlayerSample && dt > 0.0001) {
      this.#playerVelocity.subVectors(playerPos, this.#previousPlayer).multiplyScalar(1 / dt);
      const maxSpeedSq = Config.enemy.ai.maxTrackedPlayerSpeed ** 2;
      if (this.#playerVelocity.lengthSq() > maxSpeedSq) {
        this.#playerVelocity.setLength(Config.enemy.ai.maxTrackedPlayerSpeed);
      }
    } else {
      this.#playerVelocity.set(0, 0, 0);
      this.#lastKnownPlayer.copy(playerPos);
      this.#hadPlayerSample = true;
    }
    this.#previousPlayer.copy(playerPos);
  }

  #chooseTactic(distance, canSee, tookDamage, diff) {
    const ai = Config.enemy.ai;
    const healthRatio = this.enemy.hp / Math.max(1, Config.enemy.maxHP + diff.tier * Config.difficulty.hpPerTier);

    if (diff.retreatEnabled && this.enemy.hp <= Config.enemy.retreatHPThreshold) {
      if ((this.state === 'retreat' || this.state === 'cover' || this.state === 'holdCover') && this.stateTimer > 0) return;
      if (this.#selectTacticalCover()) this.#setState('retreat', ai.retreatDuration);
      else this.#setState('dodge', ai.dodgeDuration);
      return;
    }

    if (tookDamage && diff.coverChance > 0 && Math.random() < diff.coverChance + (1 - healthRatio) * 0.35) {
      if (this.#selectTacticalCover()) {
        this.#setState('cover', ai.coverTravelDuration);
        return;
      }
    }

    if (!canSee) {
      if (this.#sightMemory > 0) this.#setState('hunt', ai.huntDuration);
      else if (this.#noiseMemory > 0) this.#setState('investigate', ai.investigateDuration);
      else {
        this.#choosePatrolTarget();
        this.#setState('patrol', ai.patrolDuration);
      }
      return;
    }

    if (distance > ai.farRange) {
      this.#setState('pursue', ai.pursueDuration);
      return;
    }
    if (distance < ai.closeRange) {
      this.strafeDir *= -1;
      this.#setState(Math.random() < diff.dodgeChance + 0.25 ? 'dodge' : 'retreat', ai.dodgeDuration);
      return;
    }

    const roll = Math.random();
    const aggression = diff.aggression;
    if (this.#underFireTimer > 0 && roll < diff.dodgeChance + 0.2) {
      this.strafeDir = Math.random() < 0.5 ? -1 : 1;
      this.#setState('dodge', ai.dodgeDuration);
    } else if (roll < 0.32 + aggression * 0.15) {
      this.#setState('pursue', ai.pursueDuration);
    } else if (roll < 0.72) {
      this.strafeDir = Math.random() < 0.5 ? -1 : 1;
      this.#setState('strafe', ai.strafeDuration);
    } else {
      this.strafeDir = Math.random() < 0.5 ? -1 : 1;
      this.#setState('flank', ai.flankDuration);
    }
  }

  #setState(state, duration) {
    this.state = state;
    this.stateTimer = duration * (0.8 + Math.random() * 0.4);
  }

  #computeMovement(distance, canSee) {
    const ai = Config.enemy.ai;
    const dir = this.#moveDirection.set(0, 0, 0);
    const perp = this.#perpendicular.set(-this.#toPlayer.z, 0, this.#toPlayer.x);
    const rangeCorrection = distance > ai.optimalRangeMax ? 0.65
      : distance < ai.optimalRangeMin ? -0.75 : 0;

    switch (this.state) {
      case 'pursue':
        if (distance < ai.optimalRangeMin) dir.copy(this.#toPlayer).multiplyScalar(-0.65);
        else this.#steerToward(this.#lastKnownPlayer, dir);
        dir.addScaledVector(perp, this.strafeDir * 0.2);
        break;
      case 'strafe':
        dir.copy(perp).multiplyScalar(this.strafeDir);
        dir.addScaledVector(this.#toPlayer, rangeCorrection);
        break;
      case 'flank':
        dir.copy(perp).multiplyScalar(this.strafeDir);
        dir.addScaledVector(this.#toPlayer, 0.35 + rangeCorrection * 0.5);
        break;
      case 'dodge':
        dir.copy(perp).multiplyScalar(this.strafeDir);
        dir.addScaledVector(this.#toPlayer, distance < ai.closeRange ? -0.35 : 0.1);
        break;
      case 'retreat':
        dir.copy(this.#toPlayer).multiplyScalar(-0.8);
        if (this.#hasCoverTarget) {
          this.#probe.subVectors(this.#coverTarget, this.enemy.position).setY(0);
          if (this.#probe.lengthSq() <= ai.coverArrivalRadius ** 2) {
            this.#setState('holdCover', ai.coverHoldDuration);
          } else {
            dir.addScaledVector(this.#probe.normalize(), 0.9);
          }
        }
        break;
      case 'cover':
        if (!this.#hasCoverTarget) break;
        this.#steerToward(this.#coverTarget, dir);
        if (this.enemy.position.distanceToSquared(this.#coverTarget) <= ai.coverArrivalRadius ** 2) {
          dir.set(0, 0, 0);
          this.#setState('holdCover', ai.coverHoldDuration);
        }
        break;
      case 'holdCover':
        break;
      case 'hunt':
        this.#steerToward(this.#lastKnownPlayer, dir);
        if (this.enemy.position.distanceToSquared(this.#lastKnownPlayer) <= ai.searchArrivalRadius ** 2) {
          this.strafeDir *= -1;
          this.#setState(canSee ? 'strafe' : 'flank', ai.strafeDuration);
        }
        break;
      case 'investigate':
        this.#steerToward(this.#investigateTarget, dir);
        if (this.enemy.position.distanceToSquared(this.#investigateTarget) <= ai.searchArrivalRadius ** 2) {
          // Search from a nearby hiding/ambush position instead of standing on
          // the exact sound origin, which makes movement less predictable.
          if (this.#navigationGraph?.getTaggedPosition('ambush', this.enemy.position, this.#patrolTarget)) {
            this.#setState('ambush', ai.ambushDuration);
            this.#hasRoute = false;
          } else {
            this.#choosePatrolTarget();
            this.#setState('patrol', ai.patrolDuration);
          }
        }
        break;
      case 'ambush':
        this.#steerToward(this.#patrolTarget, dir);
        if (this.enemy.position.distanceToSquared(this.#patrolTarget) <= ai.routeArrivalRadius ** 2) dir.set(0, 0, 0);
        break;
      case 'patrol':
      default:
        this.#steerToward(this.#patrolTarget, dir);
        if (this.enemy.position.distanceToSquared(this.#patrolTarget) <= ai.searchArrivalRadius ** 2) {
          this.#choosePatrolTarget();
          this.stateTimer = 0;
        }
    }
  }

  #applySeparation(allies) {
    if (!allies?.length) return;
    const radiusSq = Config.enemy.ai.separationRadius ** 2;
    const pos = this.enemy.position;
    this.#separation.set(0, 0, 0);
    for (const ally of allies) {
      if (!ally?.enemy?.alive || ally.enemy === this.enemy) continue;
      const other = ally.enemy.position;
      const dx = pos.x - other.x;
      const dz = pos.z - other.z;
      const distSq = dx * dx + dz * dz;
      if (distSq > 0.0001 && distSq < radiusSq) {
        this.#separation.x += dx / distSq;
        this.#separation.z += dz / distSq;
      }
    }
    if (this.#separation.lengthSq() > 0) {
      this.#moveDirection.addScaledVector(this.#separation.normalize(), Config.enemy.ai.separationWeight);
    }
  }

  #avoidObstacles() {
    if (this.#moveDirection.lengthSq() < 0.0001) return;
    const ai = Config.enemy.ai;
    this.#moveDirection.normalize();
    this.#probe.copy(this.enemy.position).addScaledVector(this.#moveDirection, ai.avoidanceProbe);
    if (this.physics.isWalkable(this.#probe, Config.enemy.radius)) return;

    this.#leftCandidate.set(-this.#moveDirection.z, 0, this.#moveDirection.x);
    this.#rightCandidate.copy(this.#leftCandidate).multiplyScalar(-1);
    this.#probe.copy(this.enemy.position).addScaledVector(this.#leftCandidate, ai.avoidanceProbe);
    const leftClear = this.physics.isWalkable(this.#probe, Config.enemy.radius);
    this.#probe.copy(this.enemy.position).addScaledVector(this.#rightCandidate, ai.avoidanceProbe);
    const rightClear = this.physics.isWalkable(this.#probe, Config.enemy.radius);

    if (leftClear || rightClear) {
      const side = leftClear && rightClear
        ? (this.strafeDir < 0 ? this.#leftCandidate : this.#rightCandidate)
        : (leftClear ? this.#leftCandidate : this.#rightCandidate);
      this.#moveDirection.copy(side);
    } else {
      this.#moveDirection.multiplyScalar(-1);
      this.strafeDir *= -1;
      this.#decisionTimer = 0;
    }
  }

  #selectTacticalCover() {
    const ai = Config.enemy.ai;
    const pos = this.enemy.position;
    let bestScore = Infinity;
    let found = false;

    for (const point of this.#coverPoints) {
      const bound = Config.arena.size / 2 - Config.enemy.radius - 0.5;
      if (Math.abs(point.x) > bound || Math.abs(point.z) > bound) continue;
      const dx = point.x - pos.x;
      const dz = point.z - pos.z;
      const distSq = dx * dx + dz * dz;
      if (distSq > Config.enemy.coverSeekRadius ** 2) continue;
      this.#coverEye.set(point.x, this.#groundHeightAt(point.x, point.z) + ai.eyeHeight, point.z);
      if (!this.physics.isWalkable(this.#coverEye, Config.enemy.radius)) continue;
      const exposed = this.physics.hasLineOfSight(this.#coverEye, this.#playerEye);
      const playerDistSq = this.#coverEye.distanceToSquared(this.#playerEye);
      const score = distSq + (exposed ? ai.exposedCoverPenalty : 0) - playerDistSq * ai.coverDistanceWeight;
      if (score < bestScore) {
        bestScore = score;
        this.#coverTarget.set(point.x, this.#groundHeightAt(point.x, point.z), point.z);
        found = true;
      }
    }
    this.#hasCoverTarget = found;
    return found;
  }

  #turnToward(target, dt, diff) {
    const dx = target.x - this.enemy.position.x;
    const dz = target.z - this.enemy.position.z;
    if (dx * dx + dz * dz < 0.0001) return;
    const desired = Math.atan2(dx, dz);
    const delta = shortestAngle(desired - this.enemy.group.rotation.y);
    const turnRate = Config.enemy.ai.turnRateBase + diff.tier * Config.enemy.ai.turnRatePerTier;
    this.enemy.group.rotation.y += delta * Math.min(1, turnRate * dt);
  }

  #handleShooting(dt, playerPos, distance, canSee, diff) {
    this.fireCooldown -= dt;
    this.burstCooldown -= dt;
    if (!canSee || this.#reactionTimer > 0 || distance > Config.enemy.range) {
      this.burstRemaining = 0;
      return;
    }

    if (this.burstRemaining > 0 && this.burstCooldown <= 0) {
      this.burstRemaining--;
      this.burstCooldown = Config.enemy.ai.burstSpacing;
      this.#buildShotDirection(playerPos, distance, diff);
      this.#shots.push(this.#shotDirection);
    }

    if (this.fireCooldown <= 0 && this.burstRemaining <= 0) {
      const coverPenalty = this.state === 'holdCover' ? Config.enemy.ai.coverFireRateMultiplier : 1;
      this.fireCooldown = (diff.fireRate + Math.random() * Config.enemy.ai.fireRateJitter) * coverPenalty;
      this.burstRemaining = diff.burstCount;
      this.burstCooldown = 0;
    }
  }

  #buildShotDirection(playerPos, distance, diff) {
    const travelTime = Math.min(Config.enemy.ai.maxPredictionTime, distance / Config.weapon.bulletSpeed);
    this.#predictedTarget.copy(playerPos)
      .addScaledVector(this.#playerVelocity, travelTime * diff.aimLead);
    this.#shotDirection.subVectors(this.#predictedTarget, this.#enemyEye);
    this.#shotDirection.x += (Math.random() - 0.5) * diff.accuracy;
    this.#shotDirection.y += (Math.random() - 0.5) * diff.accuracy * 0.35;
    this.#shotDirection.z += (Math.random() - 0.5) * diff.accuracy;
    this.#shotDirection.normalize();
  }

  #updateStuckDetection(dt) {
    const movedSq = this.enemy.position.distanceToSquared(this.#lastPosition);
    if (this.#moveDirection.lengthSq() > 0.1 && movedSq < Config.enemy.ai.stuckDistance ** 2) {
      this.#stuckTimer += dt;
      if (this.#stuckTimer >= Config.enemy.ai.stuckTime) {
        this.strafeDir *= -1;
        this.#setState('dodge', Config.enemy.ai.dodgeDuration);
        this.#decisionTimer = 0;
        this.#stuckTimer = 0;
      }
    } else {
      this.#stuckTimer = 0;
    }
    this.#lastPosition.copy(this.enemy.position);
  }

  #choosePatrolTarget() {
    if (this.#navigationGraph?.getRandomPosition(this.#patrolTarget)) {
      this.#hasRoute = false;
      return;
    }
    const span = Config.arena.size - Config.enemy.ai.patrolInset * 2;
    this.#patrolTarget.set(
      (Math.random() - 0.5) * span,
      0,
      (Math.random() - 0.5) * span,
    );
  }

  #steerToward(target, out) {
    if (!this.#navigationGraph || this.#navigationGraph.empty) {
      out.subVectors(target, this.enemy.position).setY(0);
      return;
    }
    const goalMoved = this.#routeGoal.distanceToSquared(target) > 4;
    const reachedWaypoint = this.#hasRoute && this.enemy.position.distanceToSquared(this.#routeWaypoint)
      <= Config.enemy.ai.routeArrivalRadius ** 2;
    if (goalMoved || reachedWaypoint || this.#routeTimer <= 0) {
      this.#routeGoal.copy(target);
      this.#hasRoute = this.#navigationGraph.findNextWaypoint(this.enemy.position, target, this.#routeWaypoint);
      this.#routeTimer = 0.55;
    }
    out.subVectors(this.#hasRoute ? this.#routeWaypoint : target, this.enemy.position).setY(0);
  }

  #groundHeightAt(x, z) {
    return this.physics.groundHeightAt?.(x, z) ?? 0;
  }
}
