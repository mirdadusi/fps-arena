import { Config } from '../Config.js';

/**
 * DifficultyManager — Strategy pattern for scaling game difficulty.
 * Returns a difficulty profile based on the player's kill count.
 */
export class DifficultyManager {
  /** @param {number} kills */
  getProfile(kills) {
    const d = Config.difficulty;
    const tier = this.#getTier(kills);
    return {
      tier,
      name: d.names[tier],
      color: d.colors[tier],
      enemySpeed: Config.enemy.speedBase + tier * d.speedPerTier,
      fireRate:  Math.max(d.minFireRate, Config.enemy.fireRateBase - tier * d.fireRatePerTier),
      accuracy:  Math.max(d.minAccuracy, Config.enemy.accuracyBase - tier * d.accuracyPerTier),
      bulletDamage: Config.enemy.bulletDamageBase + tier * d.damagePerTier,
      enemyHP:  Config.enemy.maxHP + tier * d.hpPerTier,
      dodgeChance: d.dodgeBase + tier * d.dodgePerTier,
      burstCount: 1 + Math.min(tier, 3),
    };
  }

  #getTier(kills) {
    const t = Config.difficulty.thresholds;
    if (kills < t[0]) return 0;
    if (kills < t[1]) return 1;
    if (kills < t[2]) return 2;
    if (kills < t[3]) return 3;
    return 4;
  }
}
