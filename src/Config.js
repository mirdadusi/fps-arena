/** Central configuration — all game constants in one place. */
export const Config = Object.freeze({
  arena: {
    size: 60,
    wallHeight: 8,
  },

  player: {
    height: 1.7,
    speed: 8,
    sprintMultiplier: 1.6,
    radius: 0.4,
    maxHP: 100,
  },

  // Legacy single-weapon fallback (used by enemy AI)
  weapon: {
    bulletSpeed: 80,
    bulletDamage: 12,
    fireRate: 0.12,
    maxAmmo: 30,
    reloadTime: 1.8,
    spread: 0.015,
  },

  weapons: {
    rifle: {
      name: 'Assault Rifle', key: 0,
      bulletSpeed: 80, bulletDamage: 12, fireRate: 0.12,
      maxAmmo: 30, reloadTime: 1.8, spread: 0.015,
      bulletsPerShot: 1, bulletColor: 0xffcc00,
    },
    shotgun: {
      name: 'Shotgun', key: 1,
      bulletSpeed: 60, bulletDamage: 8, fireRate: 0.7,
      maxAmmo: 8, reloadTime: 2.2, spread: 0.08,
      bulletsPerShot: 6, bulletColor: 0xff8844,
    },
    sniper: {
      name: 'Sniper Rifle', key: 2,
      bulletSpeed: 150, bulletDamage: 55, fireRate: 1.2,
      maxAmmo: 5, reloadTime: 2.8, spread: 0.003,
      bulletsPerShot: 1, bulletColor: 0x44ccff,
    },
    rocket: {
      name: 'Rocket Launcher', key: 3,
      bulletSpeed: 40, bulletDamage: 80, fireRate: 1.5,
      maxAmmo: 4, reloadTime: 3.0, spread: 0.01,
      bulletsPerShot: 1, bulletColor: 0xff4444, explosive: true, explosionRadius: 5,
    },
  },

  grenade: {
    maxCount: 3,
    throwForce: 20,
    fuseTime: 2.5,
    damage: 60,
    radius: 6,
    bounceDecay: 0.4,
  },

  skins: [
    { name: 'Default',   primary: 0x4488ff, secondary: 0x222222 },
    { name: 'Crimson',   primary: 0xcc2222, secondary: 0x440000 },
    { name: 'Toxic',     primary: 0x22cc44, secondary: 0x004400 },
    { name: 'Gold',      primary: 0xddaa22, secondary: 0x443300 },
    { name: 'Shadow',    primary: 0x555555, secondary: 0x111111 },
    { name: 'Neon',      primary: 0xff44ff, secondary: 0x440044 },
    { name: 'Arctic',    primary: 0xaaddff, secondary: 0x334455 },
    { name: 'Lava',      primary: 0xff6600, secondary: 0x441100 },
  ],

  teams: {
    colors: { red: 0xff4444, blue: 0x4488ff },
    ctfScoreToWin: 3,
    flagReturnTime: 30,
    respawnDelay: 3,
  },

  enemy: {
    maxHP: 150,
    speedBase: 7,
    fireRateBase: 0.55,
    accuracyBase: 0.18,
    bulletDamageBase: 10,
    range: 45,
    radius: 0.6,
    hitRadius: 0.7,
    hitHalfHeight: 1.3,
  },

  physics: {
    gravity: 25,
  },

  difficulty: {
    thresholds: [3, 6, 10, 15],
    names: ['Normal', 'Hard', 'Veteran', 'Nightmare', 'Impossible'],
    colors: ['#4f4', '#fc0', '#f80', '#f44', '#f0f'],
    speedPerTier: 1.2,
    fireRatePerTier: 0.08,
    accuracyPerTier: 0.04,
    damagePerTier: 3,
    hpPerTier: 40,
    dodgeBase: 0.05,
    dodgePerTier: 0.06,
    minFireRate: 0.18,
    minAccuracy: 0.06,
  },

  rendering: {
    fogColor: 0x2a2a35,
    fogDensity: 0.006,
    toneMappingExposure: 1.6,
    ambientColor: 0x8899bb,
    ambientIntensity: 1.4,
    hemiSkyColor: 0xaabbdd,
    hemiGroundColor: 0x445566,
    hemiIntensity: 0.8,
    dirLightColor: 0xffeedd,
    dirLightIntensity: 2.0,
  },

  particles: {
    wallHitCount: 4,
    playerHitCount: 6,
    enemyHitCount: 8,
  },

  scoring: {
    baseKillScore: 100,
    tierBonus: 50,
    streakBonus: 10,
  },
});
