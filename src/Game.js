import * as THREE from 'three';
import { Config } from './Config.js';
import { EventBus, GameEvents } from './EventBus.js';
import { Lifetime } from './core/Lifetime.js';

// World
import { Arena } from './world/Arena.js';

// Entities
import { Player } from './entities/Player.js';
import { Weapon } from './entities/Weapon.js';
import { Enemy } from './entities/Enemy.js';
import { EnemyModelAssets } from './entities/EnemyModelAssets.js';
import { RemotePlayer } from './entities/RemotePlayer.js';

/** Seconds between outgoing player-state updates (20 Hz). */
const NET_SEND_INTERVAL = 1 / 20;

// Systems
import { PhysicsSystem } from './systems/PhysicsSystem.js';
import { BulletSystem } from './systems/BulletSystem.js';
import { ParticleSystem } from './systems/ParticleSystem.js';
import { AudioSystem } from './systems/AudioSystem.js';
import { PickupSystem } from './pickups/PickupSystem.js';
import { GrenadeSystem } from './systems/GrenadeSystem.js';
import { TeamManager } from './systems/TeamManager.js';

// AI
import { EnemyAI } from './ai/EnemyAI.js';
import { DifficultyManager } from './ai/DifficultyManager.js';
import { extractCoverPoints } from './ai/CoverPoints.js';
import { NavigationGraph } from './ai/NavigationGraph.js';

// UI
import { HUD } from './ui/HUD.js';
import { Minimap } from './ui/Minimap.js';
import { UIManager } from './ui/UIManager.js';
import { Scoreboard } from './ui/Scoreboard.js';
import { ChatUI } from './ui/ChatUI.js';
import { TouchControls } from './ui/TouchControls.js';

/**
 * Game — the central orchestrator (Mediator pattern).
 * Supports single-player, multiplayer, TDM, and CTF modes.
 */
export class Game {
  #bus       = new EventBus();
  #config;
  #mode;

  // World & entities
  #arena;
  #player;
  #weapon;
  #physics;
  #bullets;
  #particles;
  #audio;
  #pickups;
  #grenades;
  #teams;
  #difficulty = new DifficultyManager();
  #lifetime = new Lifetime();
  #portraitTexture = null;
  #enemyAssets = null;
  #coverPoints = [];
  #navigationGraph;
  #destroyed = false;
  #primaryDown = false;
  #scratchOrigin = new THREE.Vector3();
  #scratchDirection = new THREE.Vector3();
  #scratchWorldPosition = new THREE.Vector3();
  #scratchPlayerPosition = new THREE.Vector3();

  // Bots
  #bots = [];

  // Multiplayer
  #network      = null;
  #netAccum     = 0;
  #playerId     = null;
  #remotePlayers = new Map();
  #netUnsubs    = [];

  // UI
  #hud;
  #minimap;
  #ui;
  #scoreboard;
  #chat;
  #touch;
  #uiAccum = 0;
  #aiAccum = 0;

  // Session
  #locked    = false;
  #gameOver  = false;
  #touchPaused = false;
  #score     = 0;
  #kills     = 0;
  #deaths    = 0;
  #gameTime  = 0;
  #hitStreak = 0;
  #maxStreak = 0;
  #spawnProtection = 0;
  #playerName;
  #skinIndex = 0;

  #prevTime  = performance.now();
  #animFrame = 0;
  #onReturn;

  constructor(config, onReturn) {
    this.#config     = config;
    this.#mode       = config.mode || 'single';
    this.#onReturn   = onReturn;
    this.#playerName = config.playerName || 'Player';
    this.#skinIndex  = config.skinIndex || 0;

    // Build world
    this.#arena    = new Arena(config.arena || 'classic');
    this.#player   = new Player(this.#arena.camera);
    this.#weapon   = new Weapon(this.#arena.camera);
    this.#physics  = new PhysicsSystem(this.#arena.colliders, {
      groundHeightAt: (x, z) => this.#arena.getGroundHeight(x, z),
    });
    this.#navigationGraph = new NavigationGraph(this.#arena.navigationNodes, this.#physics);
    this.#bullets  = new BulletSystem(this.#arena.scene, this.#physics);
    this.#particles = new ParticleSystem(this.#arena.scene);
    this.#audio    = new AudioSystem();
    this.#pickups  = new PickupSystem(this.#arena.scene, (x, z) => this.#arena.getGroundHeight(x, z));
    this.#grenades = new GrenadeSystem(this.#arena.scene, this.#physics, this.#arena.renderProfile);
    this.#teams    = new TeamManager(this.#arena.scene);

    if (config.botPortrait) {
      this.#portraitTexture = new THREE.TextureLoader().load(config.botPortrait);
      this.#portraitTexture.colorSpace = THREE.SRGBColorSpace;
    }
    this.#enemyAssets = new EnemyModelAssets(this.#portraitTexture, this.#arena.meshDetail);
    this.#coverPoints = extractCoverPoints(this.#arena.colliders);

    // Team / game mode setup
    this.#teams.init(config.gameMode || 'ffa', config.team || null, Config.arena.size);

    this.#pickups.spawnFromLayout(this.#arena.pickupSpots);
    this.#spawnBots(config.botCount ?? 1);
    this.#particles.warm(this.#arena.renderer, this.#arena.camera);

    // UI
    this.#hud       = new HUD();
    this.#minimap   = new Minimap();
    this.#ui        = new UIManager();
    this.#scoreboard = new Scoreboard();
    this.#chat      = new ChatUI();
    this.#touch     = new TouchControls();

    // Place player at a spawn point
    if (this.#arena.playerSpawns.length) {
      const sp = this.#arena.playerSpawns[0];
      this.#player.position.set(sp.x, this.#arena.getGroundHeight(sp.x, sp.z) + Config.player.height, sp.z);
    }

    // Multiplayer
    if (this.#mode === 'multi' && config.network) {
      this.#network  = config.network;
      this.#playerId = config.playerId;
      this.#setupMultiplayer(config.players || []);
    }

    // Chat callback
    this.#chat.onSend(text => {
      if (this.#network) {
        this.#network.sendChat(text);
      }
      this.#chat.addMessage(this.#playerName, text, '#4f4');
    });

    this.#bindEvents();
    this.#ui.showBlocker();
    document.body.classList.add('game-active');
    this.#bus.emit(GameEvents.GAME_STARTED);
    this.#loop();
  }

  // ── Bot management ────────────────────────────────────────

  #spawnBots(count) {
    const spawns = this.#arena.playerSpawns;
    for (let i = 0; i < count; i++) {
      const enemy = new Enemy(this.#arena.scene, this.#portraitTexture, this.#enemyAssets);
      const ai    = new EnemyAI(enemy, this.#physics);
      ai.setCoverPoints(this.#coverPoints);
      ai.setNavigationGraph(this.#navigationGraph);
      const sp = spawns[(i + 1) % spawns.length] || { x: 20, z: -20 };
      const diff = this.#difficulty.getProfile(0);
      enemy.spawn(new THREE.Vector3(sp.x, this.#arena.getGroundHeight(sp.x, sp.z), sp.z), diff.enemyHP);
      this.#bots.push({ enemy, ai });
    }
  }

  // ── Multiplayer setup ─────────────────────────────────────

  #setupMultiplayer(players) {
    let colorIdx = 0;
    for (const p of players) {
      if (p.id === this.#playerId) { colorIdx++; continue; }
      const rp = new RemotePlayer(this.#arena.scene, p.id, p.name, colorIdx++, this.#arena.meshDetail);
      rp._team = p.team || null;
      this.#remotePlayers.set(p.id, rp);
    }

    const on = (type, cb) => { this.#netUnsubs.push(this.#network.on(type, cb)); };

    on('PLAYER_STATE', msg => {
      const rp = this.#remotePlayers.get(msg.playerId);
      if (rp?.alive) rp.setTarget(msg.position, msg.rotation.y);
    });

    on('PLAYER_RESPAWN', msg => {
      this.#remotePlayers.get(msg.playerId)?.respawn(msg.position);
    });

    on('PLAYER_SHOOT', msg => {
      const o = msg.origin;
      const d = msg.direction;
      this.#bullets.spawn(
        new THREE.Vector3(o.x, o.y, o.z),
        new THREE.Vector3(d.x, d.y, d.z),
        true,
      );
    });

    on('PLAYER_JOINED', msg => {
      if (msg.playerId === this.#playerId) return;
      if (!this.#remotePlayers.has(msg.playerId)) {
        const rp = new RemotePlayer(
          this.#arena.scene, msg.playerId, msg.name,
          this.#remotePlayers.size + 1, this.#arena.meshDetail,
        );
        rp._team = msg.team || null;
        this.#remotePlayers.set(msg.playerId, rp);
      }
    });

    on('PLAYER_LEFT', msg => {
      const rp = this.#remotePlayers.get(msg.playerId);
      if (rp) { rp.destroy(); this.#remotePlayers.delete(msg.playerId); }
    });

    on('PICKUP_COLLECTED', msg => {
      this.#pickups.collect(msg.pickupId);
    });

    on('PLAYER_HIT', msg => {
      if (msg.targetId === this.#playerId) {
        this.#applyPlayerDamage(msg.damage, 'Eliminated by another player');
      }
    });

    on('PLAYER_KILLED', msg => {
      if (msg.targetId === this.#playerId) {
        this.#enterPlayerDeath('Eliminated by another player');
        // Drop flag if carrying in CTF
        if (this.#teams.mode === 'ctf') {
          const dropped = this.#teams.dropFlag(this.#playerId, this.#player.position);
          if (dropped) this.#chat.addSystem(`You dropped the ${dropped} flag!`);
        }
      }
      if (msg.killerId === this.#playerId) {
        this.#kills++;
        this.#score += 100;
        this.#hud.addKillFeed('Enemy player eliminated +100');
      }
      if (msg.targetId !== this.#playerId) this.#remotePlayers.get(msg.targetId)?.kill();
    });

    on('CHAT_MESSAGE', msg => {
      this.#chat.addMessage(msg.name || 'Player', msg.text, msg.color || '#fff');
    });

    on('WEAPON_SWITCH', msg => {
      // Could update remote player weapon visual in the future
    });

    on('GRENADE_THROW', msg => {
      // Remote player threw grenade — spawn visual
    });

    on('disconnected', () => {
      this.#hud.addKillFeed('Connection lost — reconnecting…');
    });

    on('reconnecting', msg => {
      this.#hud.addKillFeed(`Reconnect attempt ${msg.attempt}…`);
    });

    on('reconnected', () => {
      this.#hud.addKillFeed('Reconnected to match');
    });

    on('reconnect_failed', () => {
      this.#hud.addKillFeed('Match expired — returning to lobby');
      this.#lifetime.timeout(() => this.#onReturn?.(), 1400);
    });
  }

  // ── Event wiring ──────────────────────────────────────────

  #bindEvents() {
    this.#lifetime.listen(document, 'pointerlockchange', () => {
      this.#locked = document.pointerLockElement === this.#arena.renderer.domElement;
      if (this.#locked) {
        this.#ui.hideBlocker();
        this.#audio.init();
      } else if (!this.#gameOver) {
        this.#primaryDown = false;
        this.#weapon.setAiming(false);
        this.#ui.showBlocker();
      }
    });

    this.#lifetime.listen(document, 'pointerlockerror', () => {
      const el = document.getElementById('pointer-lock-error');
      if (el) el.style.display = 'block';
    });

    this.#lifetime.listen(document, 'mousedown', e => {
      if (e.target instanceof Element && e.target.closest('button, a, input, [data-game-action]')) return;
      if (this.#chat.isOpen) return;
      if (!this.#locked && !this.#gameOver && !this.#touch.active) {
        this.#requestPointerLock();
        return;
      }
      if (e.button === 0) this.#playerShoot();
      if (e.button === 0) this.#primaryDown = true;
      if (e.button === 2) this.#weapon.setAiming(true);
    });
    this.#lifetime.listen(document, 'mouseup', e => {
      if (e.button === 0) this.#primaryDown = false;
      if (e.button === 2) this.#weapon.setAiming(false);
    });
    this.#lifetime.listen(document, 'contextmenu', e => {
      if (this.#locked) e.preventDefault();
    });

    this.#lifetime.listen(document, 'keydown', e => {
      if (this.#chat.isOpen) return;
      if (e.code === 'KeyR' && this.#locked) this.#weapon.startReload();

      // Weapon switching 1-4
      if (e.code === 'Digit1') this.#weapon.switchTo(0);
      if (e.code === 'Digit2') this.#weapon.switchTo(1);
      if (e.code === 'Digit3') this.#weapon.switchTo(2);
      if (e.code === 'Digit4') this.#weapon.switchTo(3);

      // Grenade
      if (e.code === 'KeyG' && this.#locked) this.#throwGrenade();
    });

    // Scroll wheel for weapon switching
    this.#lifetime.listen(document, 'wheel', e => {
      if (this.#locked && !this.#chat.isOpen) {
        this.#weapon.scrollWeapon(e.deltaY);
      }
    });

    // Mute toggle button
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
      this.#lifetime.listen(muteBtn, 'click', e => {
        e.stopPropagation();
        if (this.#audio.volume > 0) {
          muteBtn.dataset.prevVolume = String(this.#audio.volume);
          this.#audio.setVolume(0);
          muteBtn.textContent = '🔇';
        } else {
          const prev = parseFloat(muteBtn.dataset.prevVolume) || 0.4;
          this.#audio.setVolume(prev);
          muteBtn.textContent = '🔊';
        }
      });
    }

    // AudioSystem EventBus subscriptions
    const onBus = (type, callback) => this.#lifetime.add(this.#bus.on(type, callback));
    onBus(GameEvents.PLAYER_SHOT,      d => this.#audio.playShot(d?.weaponKey));
    onBus(GameEvents.BULLET_HIT_WALL,  () => this.#audio.playImpactWall());
    onBus(GameEvents.BULLET_HIT_ENEMY, () => this.#audio.playImpactEnemy());
    onBus(GameEvents.PLAYER_RELOADED,  () => this.#audio.playReload());
    onBus(GameEvents.GRENADE_EXPLODE,  () => this.#audio.playExplosion());
    onBus(GameEvents.PLAYER_DAMAGED,   () => this.#audio.playDamage());
    onBus(GameEvents.PICKUP_COLLECTED, d => this.#audio.playPickup(d?.type));
    onBus(GameEvents.ENEMY_DIED,       () => this.#audio.playEnemyDeath());
    onBus(GameEvents.GAME_STARTED,     () => this.#audio.startAmbient());
    onBus(GameEvents.GAME_OVER,        () => this.#audio.stopAmbient());

    this.#ui.onRespawn(() => this.#respawnPlayer());
    this.#lifetime.listen(window, 'resize', () => this.#arena.onResize());

    this.#lifetime.listen(document.getElementById('resume-game-btn'), 'click', e => {
      e.stopPropagation();
      if (this.#touch.active) this.#closeTouchMenu();
      else this.#requestPointerLock();
    });
    this.#lifetime.listen(document.getElementById('return-lobby-btn'), 'click', e => {
      e.stopPropagation();
      this.#network?.leaveRoom();
      this.#onReturn?.();
    });
  }

  #requestPointerLock() {
    try {
      const result = this.#arena.renderer.domElement.requestPointerLock();
      result?.catch?.(() => {
        const el = document.getElementById('pointer-lock-error');
        if (el) el.style.display = 'block';
      });
    } catch {
      const el = document.getElementById('pointer-lock-error');
      if (el) el.style.display = 'block';
    }
  }

  // ── Player shooting ───────────────────────────────────────

  #playerShoot() {
    if (this.#gameOver) return;
    if (!this.#weapon.tryFire()) return;

    this.#bus.emit(GameEvents.PLAYER_SHOT, { weaponKey: this.#weapon.currentKey });
    for (const bot of this.#bots) bot.ai.hearNoise(this.#arena.camera.position, 1);

    const cam = this.#arena.camera;
    const def = this.#weapon.currentDef;
    const count = def.bulletsPerShot || 1;

    for (let i = 0; i < count; i++) {
      const dir = this.#scratchDirection.set(0, 0, -1).applyQuaternion(cam.quaternion);
      const s = def.spread;
      dir.x += (Math.random() - 0.5) * s * 2;
      dir.y += (Math.random() - 0.5) * s * 2;
      dir.z += (Math.random() - 0.5) * s * 2;
      dir.normalize();

      const origin = this.#scratchOrigin.copy(cam.position).addScaledVector(dir, 0.8);
      this.#bullets.spawn(origin, dir, false, def);
    }

    if (this.#network) {
      const dir = this.#scratchDirection.set(0, 0, -1).applyQuaternion(cam.quaternion);
      const origin = this.#scratchOrigin.copy(cam.position).addScaledVector(dir, 0.8);
      this.#network.sendShoot(origin, dir);
    }
  }

  // ── Grenade throwing ──────────────────────────────────────

  #throwGrenade() {
    if (this.#gameOver) return;
    const cam = this.#arena.camera;
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    const origin = cam.position.clone();
    if (this.#grenades.throw(origin, dir, this.#player.yaw, this.#player.pitch)) {
      for (const bot of this.#bots) bot.ai.hearNoise(origin, 0.8);
      this.#hud.addKillFeed(`Grenade thrown (${this.#grenades.count} left)`);
    }
  }

  // ── Hit handling ──────────────────────────────────────────

  #onPlayerHit(bullet) {
    if (this.#gameOver) return false;
    if (!this.#bullets.testPlayerHit(bullet, this.#arena.camera.position)) return false;

    // A fresh spawn still absorbs the projectile so it cannot hit again on
    // the first vulnerable frame, but does not take damage.
    if (this.#spawnProtection > 0) return true;

    const shieldMul = this.#pickups.getShieldMultiplier();
    const diff = this.#difficulty.getProfile(this.#kills);
    const dmg = Math.round(diff.bulletDamage * shieldMul);
    this.#hitStreak = 0;
    this.#particles.spawn(bullet.mesh.position, 0xff0000, Config.particles.playerHitCount);
    this.#applyPlayerDamage(dmg, 'Eliminated by enemy fire');
    return true;
  }

  /** Every damage source must pass here so lethal feedback cannot be skipped. */
  #applyPlayerDamage(amount, cause) {
    if (this.#gameOver || this.#spawnProtection > 0 || !Number.isFinite(amount) || amount <= 0) return false;
    const dead = this.#player.takeDamage(amount);
    this.#hud.flashDamage();
    this.#bus.emit(GameEvents.PLAYER_DAMAGED);
    if (dead) this.#enterPlayerDeath(cause);
    return dead;
  }

  #enterPlayerDeath(cause) {
    if (this.#gameOver) return;
    this.#gameOver = true;
    this.#player.hp = 0;
    this.#deaths++;
    this.#primaryDown = false;
    this.#touch.releaseAll();
    document.exitPointerLock?.();
    this.#bus.emit(GameEvents.GAME_OVER);
    const mins = Math.floor(this.#gameTime / 60);
    const secs = Math.floor(this.#gameTime % 60).toString().padStart(2, '0');
    this.#ui.showGameOver({
      score: this.#score, kills: this.#kills,
      time: `${mins}:${secs}`, maxStreak: this.#maxStreak,
    }, cause);
  }

  #onEnemyHit(bullet) {
    const wpnDef = bullet.weaponDef || this.#weapon.currentDef;
    const baseDmg = wpnDef.bulletDamage || Config.weapon.bulletDamage;

    // Check bots
    for (const bot of this.#bots) {
      if (!bot.enemy.alive) continue;
      const wp = this.#scratchWorldPosition;
      bot.enemy.group.getWorldPosition(wp);
      wp.y = 1.0;
      if (!this.#bullets.testEnemyHit(bullet, wp)) continue;

      const dmgMul = this.#pickups.getDamageMultiplier();
      const dead = bot.enemy.takeDamage(Math.round(baseDmg * dmgMul));
      this.#hitStreak++;
      if (this.#hitStreak > this.#maxStreak) this.#maxStreak = this.#hitStreak;
      this.#particles.spawn(bullet.mesh.position, 0xff4444, Config.particles.enemyHitCount);
      this.#hud.flashHitMarker();
      this.#bus.emit(GameEvents.BULLET_HIT_ENEMY);

      // Rocket splash damage
      if (wpnDef.explosive) this.#doSplashDamage(bullet.mesh.position, wpnDef);

      if (dead) {
        bot.enemy.kill();
        this.#bus.emit(GameEvents.ENEMY_DIED);
        const diff = this.#difficulty.getProfile(this.#kills);
        const killScore = Config.scoring.baseKillScore + diff.tier * Config.scoring.tierBonus + this.#hitStreak * Config.scoring.streakBonus;
        this.#score += killScore;
        this.#kills++;
        if (this.#teams.isTeamMode()) this.#teams.scores[this.#teams.localTeam || 'red']++;
        this.#hud.addKillFeed(`Enemy eliminated +${killScore}`);
        const hideMsg = this.#hud.showKillMessage();
        const botRef = bot;
        this.#lifetime.timeout(() => { hideMsg(); this.#respawnBot(botRef); }, 2000);
      }
      return true;
    }

    // Check remote players
    for (const [id, rp] of this.#remotePlayers) {
      if (!rp.alive) continue;
      // Skip friendly fire in team modes
      if (this.#teams.isFriendly(id, rp._team)) continue;

      const wp = this.#scratchWorldPosition.copy(rp.position);
      wp.y = 1.0;
      if (!this.#bullets.testEnemyHit(bullet, wp)) continue;

      const dmgMul = this.#pickups.getDamageMultiplier();
      const dmg = Math.round(baseDmg * dmgMul);
      this.#particles.spawn(bullet.mesh.position, 0xff4444, Config.particles.enemyHitCount);
      this.#hud.flashHitMarker();
      this.#hitStreak++;
      if (this.#hitStreak > this.#maxStreak) this.#maxStreak = this.#hitStreak;

      if (this.#network) {
        this.#network.sendPlayerHit(id, dmg);
        const dead = rp.takeDamage(dmg);
        if (dead) {
          this.#network.sendPlayerKilled(id);
          this.#kills++;
          this.#score += 100;
          this.#hud.addKillFeed(`Player eliminated +100`);
        }
      }
      return true;
    }

    return false;
  }

  #doSplashDamage(pos, wpnDef) {
    const radius = wpnDef.explosionRadius || 5;
    // Visual explosion effect
    this.#particles.spawn(pos, 0xff6600, 20);

    // Splash damage to player
    const playerDist = pos.distanceTo(this.#arena.camera.position);
    if (playerDist < radius) {
      const splashDmg = Math.round(wpnDef.bulletDamage * 0.5 * (1 - playerDist / radius));
      if (splashDmg > 0) this.#applyPlayerDamage(splashDmg, 'Caught in a rocket explosion');
    }
  }

  // ── Bot respawn ───────────────────────────────────────────

  #respawnBot(bot) {
    const diff = this.#difficulty.getProfile(this.#kills);
    const safeSpawns = this.#arena.playerSpawns.filter(spawn => {
      const dx = spawn.x - this.#arena.camera.position.x;
      const dz = spawn.z - this.#arena.camera.position.z;
      return dx * dx + dz * dz >= 15 * 15;
    });
    const spawns = safeSpawns.length ? safeSpawns : this.#arena.playerSpawns;
    const spawn = spawns[Math.floor(Math.random() * spawns.length)] || { x: 20, z: -20 };
    const pos = new THREE.Vector3(
      spawn.x,
      this.#arena.getGroundHeight(spawn.x, spawn.z),
      spawn.z,
    );

    bot.enemy.spawn(pos, diff.enemyHP);
    bot.ai.reset();
    this.#hitStreak = 0;
    this.#hud.addKillFeed(`Difficulty: ${diff.name}`);
  }

  // ── Pickup collection ─────────────────────────────────────

  #onPickupCollect(pickup) {
    switch (pickup.type) {
      case 'health':
        this.#player.hp = Math.min(Config.player.maxHP, this.#player.hp + pickup.def.value);
        break;
      case 'ammo':
        this.#weapon.ammo = Math.min(this.#weapon.currentDef.maxAmmo, this.#weapon.ammo + pickup.def.value);
        break;
    }
    this.#particles.spawn(
      this.#scratchOrigin.set(
        pickup.spot.x,
        this.#arena.getGroundHeight(pickup.spot.x, pickup.spot.z) + 1,
        pickup.spot.z,
      ),
      pickup.def.color, 10,
    );
    // Web Audio nodes and feed DOM are cosmetic. Schedule them after the
    // collection render so mobile Safari cannot turn feedback into a hitch.
    this.#lifetime.timeout(() => {
      this.#hud.addKillFeed(`Picked up ${pickup.def.name}`);
      this.#bus.emit(GameEvents.PICKUP_COLLECTED, { type: pickup.type });
    }, 0);
    if (this.#network) this.#network.sendPickupCollected(pickup.id);
  }

  // ── Player respawn ────────────────────────────────────────

  #respawnPlayer() {
    this.#player.reset();
    this.#weapon.reset();
    this.#bullets.clearAll();
    this.#grenades.reset();
    this.#hitStreak = 0;
    this.#spawnProtection = Config.player.spawnProtection;
    this.#gameOver = false;
    this.#touch.releaseAll();
    this.#ui.hideGameOver();
    this.#hud.clearKillFeed();
    this.#audio.startAmbient();

    if (this.#arena.playerSpawns.length) {
      const sp = this.#selectSafePlayerSpawn();
      this.#player.position.set(sp.x, this.#arena.getGroundHeight(sp.x, sp.z) + Config.player.height, sp.z);
    }

    this.#network?.sendPlayerRespawn(this.#player.position);

    this.#hud.addKillFeed('Respawned — brief damage protection');

    if (!this.#touch.active) {
      this.#requestPointerLock();
    }
  }

  /** Choose the spawn whose nearest living bot is furthest away. */
  #selectSafePlayerSpawn() {
    let best = this.#arena.playerSpawns[0];
    let bestClearance = -1;
    for (const spawn of this.#arena.playerSpawns) {
      let clearance = Infinity;
      for (const bot of this.#bots) {
        if (!bot.enemy.alive) continue;
        const dx = spawn.x - bot.enemy.position.x;
        const dz = spawn.z - bot.enemy.position.z;
        clearance = Math.min(clearance, dx * dx + dz * dz);
      }
      if (clearance > bestClearance) {
        best = spawn;
        bestClearance = clearance;
      }
    }
    return best;
  }

  // ── Scoreboard data ───────────────────────────────────────

  #getScoreboardData() {
    const data = [{
      name: this.#playerName, kills: this.#kills, deaths: this.#deaths,
      score: this.#score, color: '#4f4', isLocal: true,
      team: this.#teams.localTeam,
    }];
    for (const [, rp] of this.#remotePlayers) {
      data.push({
        name: rp.name, kills: 0, deaths: 0, score: 0,
        color: '#' + rp.color.toString(16).padStart(6, '0'),
        team: rp._team,
      });
    }
    let botIdx = 1;
    for (const bot of this.#bots) {
      data.push({ name: `Bot ${botIdx++}`, kills: 0, deaths: 0, score: 0, color: '#f44' });
    }
    return data;
  }

  // ── Destroy ───────────────────────────────────────────────

  destroy() {
    if (this.#destroyed) return;
    this.#destroyed = true;
    cancelAnimationFrame(this.#animFrame);
    this.#lifetime.dispose();
    if (document.pointerLockElement === this.#arena.renderer.domElement) document.exitPointerLock?.();
    document.body.classList.remove('game-active');
    document.body.classList.remove('touch-menu-open');
    for (const unsub of this.#netUnsubs) unsub();
    this.#netUnsubs.length = 0;
    for (const [, rp] of this.#remotePlayers) rp.destroy();
    this.#remotePlayers.clear();
    for (const bot of this.#bots) bot.enemy.destroy();
    this.#bots.length = 0;
    this.#enemyAssets?.dispose();
    this.#enemyAssets = null;
    this.#player.destroy();
    this.#weapon.destroy();
    this.#pickups.dispose();
    this.#bullets.dispose();
    this.#particles.dispose();
    this.#grenades.dispose();
    this.#teams.destroy();
    this.#hud.destroy();
    this.#ui.destroy();
    this.#scoreboard.destroy();
    this.#chat.destroy();
    this.#touch.destroy();
    void this.#audio.dispose();
    const pointerError = document.getElementById('pointer-lock-error');
    if (pointerError) pointerError.style.display = 'none';
    this.#portraitTexture?.dispose();
    this.#portraitTexture = null;
    this.#arena.destroy();
    this.#bus.clear();
  }

  // ── Game loop ─────────────────────────────────────────────

  #loop() {
    if (this.#destroyed) return;
    this.#animFrame = requestAnimationFrame(() => this.#loop());

    const now = performance.now();
    const elapsed = Math.max(0, (now - this.#prevTime) / 1000);
    const dt = Math.min(elapsed, 0.05);
    this.#prevTime = now;

    // Touch controls input
    if (this.#touch.active) {
      this.#handleTouchInput(dt);
    }

    if ((this.#locked || this.#touch.active) && !this.#gameOver && !this.#touchPaused) {
      // Player
      const speedMul = this.#pickups.getSpeedMultiplier();
      this.#scratchPlayerPosition.copy(this.#player.position);
      if (this.#touch.active) {
        this.#player.updateFromTouch(dt, this.#touch.moveX, this.#touch.moveY, this.#touch.lookDX, this.#touch.lookDY, speedMul);
      } else {
        this.#player.update(dt, speedMul);
      }
      const moveX = this.#player.position.x - this.#scratchPlayerPosition.x;
      const moveZ = this.#player.position.z - this.#scratchPlayerPosition.z;
      this.#player.position.x = this.#scratchPlayerPosition.x;
      this.#player.position.z = this.#scratchPlayerPosition.z;
      const feetY = this.#player.position.y - this.#player.bodyHeight;
      this.#physics.moveWithCollisions(
        this.#player.position, moveX, moveZ,
        Config.player.radius, feetY, this.#player.bodyHeight,
      );
      this.#player.updateVertical(dt, this.#physics, this.#touch.active && this.#touch.wantsJump, this.#touch.active && this.#touch.crouching);
      this.#player.clampToBounds();

      // Weapon
      const reloadDone = this.#weapon.update(dt, now, this.#player.isMoving);
      if (this.#primaryDown && this.#weapon.currentDef.automatic) this.#playerShoot();
      if (reloadDone) this.#bus.emit(GameEvents.PLAYER_RELOADED);
      if (this.#player.wantsReload() || this.#touch.wantsReload) this.#weapon.startReload();

      // Touch weapon switch
      const touchWpn = this.#touch.consumeFrame();
      if (touchWpn >= 0) this.#weapon.switchTo(touchWpn);

      // Touch shoot
      if (this.#touch.active && this.#touch.shooting) this.#playerShoot();

      // Touch grenade
      if (this.#touch.wantsGrenade) {
        this.#throwGrenade();
        this.#touch.wantsGrenade = false;
      }

      // Bot AI
      const diff = this.#difficulty.getProfile(this.#kills);
      let aiDt = dt;
      if (this.#arena.aiInterval > 0) {
        this.#aiAccum = Math.min(this.#aiAccum + dt, this.#arena.aiInterval * 2);
        if (this.#aiAccum >= this.#arena.aiInterval) {
          aiDt = this.#aiAccum;
          this.#aiAccum = 0;
        } else {
          aiDt = 0;
        }
      }
      for (const bot of this.#bots) {
        if (aiDt > 0) {
          const shots = bot.ai.update(aiDt, this.#arena.camera.position, diff, this.#bots);
          for (const dir of shots) {
            this.#scratchOrigin.set(bot.enemy.position.x, bot.enemy.position.y + Config.enemy.ai.eyeHeight, bot.enemy.position.z);
            this.#bullets.spawn(this.#scratchOrigin, dir, true);
          }
        }
        bot.enemy.updateAnimation(now);
      }

      // Pickups
      this.#pickups.update(dt, this.#player.position, p => this.#onPickupCollect(p));

      // Grenades
      const grenadeResults = this.#grenades.update(dt, this.#arena.camera.position, this.#bots, this.#remotePlayers);
      if (grenadeResults.explosionCount > 0) this.#bus.emit(GameEvents.GRENADE_EXPLODE);
      if (grenadeResults.playerDamage > 0) {
        this.#applyPlayerDamage(grenadeResults.playerDamage, 'Caught in a grenade explosion');
      }
      for (const hit of grenadeResults.enemyHits) {
        const dead = hit.bot.enemy.takeDamage(hit.damage);
        if (dead) {
          hit.bot.enemy.kill();
          this.#bus.emit(GameEvents.ENEMY_DIED);
          this.#kills++;
          this.#score += 100;
          this.#hud.addKillFeed('Enemy eliminated by grenade +100');
          const hideMsg = this.#hud.showKillMessage();
          const botRef = hit.bot;
          this.#lifetime.timeout(() => { hideMsg(); this.#respawnBot(botRef); }, 2000);
        }
      }
      for (const hit of grenadeResults.remoteHits) {
        if (this.#network) {
          this.#network.sendPlayerHit(hit.id, hit.damage);
          const dead = hit.rp.takeDamage(hit.damage);
          if (dead) {
            this.#network.sendPlayerKilled(hit.id);
            this.#kills++;
            this.#score += 100;
            this.#hud.addKillFeed('Player eliminated by grenade +100');
          }
        }
      }

      // Team / CTF
      if (this.#teams.mode === 'ctf') {
        const flagEvent = this.#teams.tryPickupFlag(this.#player.position, this.#playerId || 'local');
        if (flagEvent && !flagEvent.startsWith('return_')) {
          this.#chat.addSystem(`You picked up the ${flagEvent} flag!`);
        } else if (flagEvent?.startsWith('return_')) {
          this.#chat.addSystem(`${flagEvent.split('_')[1]} flag returned!`);
        }

        const ctfEvent = this.#teams.update(dt, this.#player.position, this.#playerId || 'local');
        if (ctfEvent?.type === 'capture') {
          this.#chat.addSystem(`Flag captured! Score: Red ${ctfEvent.scores.red} - Blue ${ctfEvent.scores.blue}`);
          this.#score += 500;
        }
      }

      // Remote players
      for (const [, rp] of this.#remotePlayers) rp.update(dt);

      // Network sync, throttled. Sending every frame put ~3400 messages/s and
      // ~4 Mbit/s through a full 8-player room for no visible benefit —
      // remote players already interpolate between updates.
      if (this.#network) {
        this.#netAccum += dt;
        if (this.#netAccum >= NET_SEND_INTERVAL) {
          // Subtract rather than zero the accumulator: zeroing discards the
          // remainder and under-sends on machines whose frame time does not
          // divide the interval (15/s instead of 20/s at 30fps).
          this.#netAccum -= NET_SEND_INTERVAL;
          this.#network.sendPlayerState(this.#player.position, { y: this.#player.yaw, x: this.#player.pitch });
        }
      }

      this.#gameTime += dt;
      this.#spawnProtection = Math.max(0, this.#spawnProtection - dt);
    }

    // Bullets
    this.#bullets.update(dt, {
      onWallHit: pos => {
        this.#particles.spawn(pos, 0xffaa44, Config.particles.wallHitCount);
        this.#bus.emit(GameEvents.BULLET_HIT_WALL);
      },
      onPlayerHit: bullet => this.#onPlayerHit(bullet),
      onEnemyHit:  bullet => this.#onEnemyHit(bullet),
    });

    this.#particles.update(dt);

    // DOM and 2D-canvas updates do not need render-frame frequency. The
    // minimap walks every collider and used to compete with WebGL at 60 Hz.
    this.#uiAccum += dt;
    if (this.#uiAccum >= 0.1) {
      this.#uiAccum %= 0.1;
      const diff = this.#difficulty.getProfile(this.#kills);
      const closestBot = this.#bots.length ? this.#bots.reduce((a, b) =>
        a.enemy.position.distanceToSquared(this.#player.position) < b.enemy.position.distanceToSquared(this.#player.position) ? a : b
      ) : null;

      this.#hud.update({
        playerHP: this.#player.hp,
        ammo: this.#weapon.ammo,
        reloading: this.#weapon.reloading,
        enemyHP: closestBot?.enemy.hp ?? 0,
        score: this.#score,
        kills: this.#kills,
        gameTime: this.#gameTime,
        activeEffects: this.#pickups.activeEffects,
        weaponName: this.#weapon.weaponName,
        weaponIndex: this.#weapon.weaponIndex,
        grenades: this.#grenades.count,
        teamScores: this.#teams.isTeamMode() ? this.#teams.getTeamScores() : null,
        gameMode: this.#teams.mode,
      }, diff);

      const enemyPositions = this.#bots
        .filter(b => b.enemy.alive)
        .map(b => ({ x: b.enemy.position.x, z: b.enemy.position.z, color: '#f44' }));
      for (const [, rp] of this.#remotePlayers) {
        if (rp.alive) enemyPositions.push({ x: rp.position.x, z: rp.position.z, color: '#' + rp.color.toString(16).padStart(6, '0') });
      }

      this.#minimap.draw(
        this.#arena.colliders,
        this.#player.position,
        this.#player.yaw,
        enemyPositions,
        this.#pickups.getPickupPositions(),
      );
      this.#scoreboard.update(this.#getScoreboardData());
    }

    this.#arena.updatePerformance(elapsed);
    this.#arena.render();
  }

  #handleTouchInput(dt) {
    if (this.#touch.wantsMenu) {
      this.#touch.releaseAll();
      this.#touchPaused = true;
      document.body.classList.add('touch-menu-open');
      this.#ui.showBlocker();
      return;
    }
    if (this.#touchPaused) return;

    // Touch look -> player look is handled in player.updateFromTouch
    // Auto-lock for touch devices
    if (!this.#locked && !this.#gameOver) {
      this.#locked = true;
      this.#ui.hideBlocker();
    }
  }

  #closeTouchMenu() {
    this.#touchPaused = false;
    document.body.classList.remove('touch-menu-open');
    this.#ui.hideBlocker();
  }
}
