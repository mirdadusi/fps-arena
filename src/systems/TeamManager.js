import * as THREE from 'three';
import { Config } from '../Config.js';
import { disposeObject3D } from '../rendering/disposeObject3D.js';

/**
 * TeamManager — handles team deathmatch and capture-the-flag modes.
 */
export class TeamManager {
  mode = 'ffa'; // 'ffa' | 'tdm' | 'ctf'
  localTeam = null; // 'red' | 'blue'
  scores = { red: 0, blue: 0 };

  // CTF
  #flags = {};
  #scene;
  #flagMeshes = {};
  #flagBases = {};
  #flagCarrier = { red: null, blue: null };
  #flagReturnTimers = { red: 0, blue: 0 };
  #flagDropPositions = { red: null, blue: null };

  constructor(scene) {
    this.#scene = scene;
  }

  init(mode, team, arenaSize) {
    this.mode = mode || 'ffa';
    this.localTeam = team || null;
    this.scores = { red: 0, blue: 0 };

    if (this.mode === 'ctf') {
      this.#setupFlags(arenaSize);
    }
  }

  #setupFlags(arenaSize) {
    const half = arenaSize / 2 - 5;

    const flagPositions = {
      red:  new THREE.Vector3(-half, 0, 0),
      blue: new THREE.Vector3(half, 0, 0),
    };

    for (const team of ['red', 'blue']) {
      const color = Config.teams.colors[team];

      // Flag base
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.2, 16),
        new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.5 }),
      );
      base.position.copy(flagPositions[team]);
      base.position.y = 0.1;
      this.#scene.add(base);
      this.#flagBases[team] = base;

      // Flag pole + flag
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 3, 6),
        new THREE.MeshStandardMaterial({ color: 0x888888 }),
      );
      pole.position.copy(flagPositions[team]);
      pole.position.y = 1.5;
      this.#scene.add(pole);

      const flag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 0.5),
        new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
      );
      flag.position.copy(flagPositions[team]);
      flag.position.y = 2.8;
      flag.position.x += 0.4;
      this.#scene.add(flag);

      this.#flagMeshes[team] = { pole, flag, base };
      this.#flags[team] = flagPositions[team].clone();
      this.#flagCarrier[team] = null;
      this.#flagDropPositions[team] = null;
    }
  }

  isTeamMode() { return this.mode === 'tdm' || this.mode === 'ctf'; }

  getEnemyTeam() {
    return this.localTeam === 'red' ? 'blue' : 'red';
  }

  isFriendly(playerId, playerTeam) {
    return this.isTeamMode() && playerTeam === this.localTeam;
  }

  /** Check if player can pick up enemy flag. Returns flag team if picked up. */
  tryPickupFlag(playerPos, playerId) {
    if (this.mode !== 'ctf') return null;
    const enemyTeam = this.getEnemyTeam();

    const flagPos = this.#flagDropPositions[enemyTeam] || this.#flags[enemyTeam];
    if (!this.#flagCarrier[enemyTeam] && playerPos.distanceTo(flagPos) < 2) {
      this.#flagCarrier[enemyTeam] = playerId;
      this.#flagDropPositions[enemyTeam] = null;
      if (this.#flagMeshes[enemyTeam]) {
        this.#flagMeshes[enemyTeam].pole.visible = false;
        this.#flagMeshes[enemyTeam].flag.visible = false;
      }
      return enemyTeam;
    }

    // Auto-return own flag if at base
    const ownTeam = this.localTeam;
    if (this.#flagDropPositions[ownTeam] && playerPos.distanceTo(this.#flags[ownTeam]) < 2) {
      this.#returnFlag(ownTeam);
      return 'return_' + ownTeam;
    }

    return null;
  }

  /** Check if carrying flag and at home base (capture). */
  tryCapture(playerPos, playerId) {
    if (this.mode !== 'ctf') return false;
    const enemyTeam = this.getEnemyTeam();

    if (this.#flagCarrier[enemyTeam] === playerId) {
      const homeBase = this.#flags[this.localTeam];
      if (playerPos.distanceTo(homeBase) < 2) {
        this.scores[this.localTeam]++;
        this.#flagCarrier[enemyTeam] = null;
        this.#returnFlag(enemyTeam);
        return true;
      }
    }
    return false;
  }

  dropFlag(playerId, position) {
    for (const team of ['red', 'blue']) {
      if (this.#flagCarrier[team] === playerId) {
        this.#flagCarrier[team] = null;
        this.#flagDropPositions[team] = position.clone();
        this.#flagReturnTimers[team] = Config.teams.flagReturnTime;

        if (this.#flagMeshes[team]) {
          this.#flagMeshes[team].pole.visible = true;
          this.#flagMeshes[team].flag.visible = true;
          this.#flagMeshes[team].pole.position.set(position.x, 1.5, position.z);
          this.#flagMeshes[team].flag.position.set(position.x + 0.4, 2.8, position.z);
          this.#flagMeshes[team].base.position.set(position.x, 0.1, position.z);
        }
        return team;
      }
    }
    return null;
  }

  #returnFlag(team) {
    this.#flagDropPositions[team] = null;
    this.#flagReturnTimers[team] = 0;
    if (this.#flagMeshes[team]) {
      this.#flagMeshes[team].pole.visible = true;
      this.#flagMeshes[team].flag.visible = true;
      this.#flagMeshes[team].pole.position.set(this.#flags[team].x, 1.5, this.#flags[team].z);
      this.#flagMeshes[team].flag.position.set(this.#flags[team].x + 0.4, 2.8, this.#flags[team].z);
      this.#flagMeshes[team].base.position.set(this.#flags[team].x, 0.1, this.#flags[team].z);
    }
  }

  update(dt, playerPos, playerId) {
    if (this.mode !== 'ctf') return null;
    let event = null;

    // Auto-return dropped flags
    for (const team of ['red', 'blue']) {
      if (this.#flagDropPositions[team]) {
        this.#flagReturnTimers[team] -= dt;
        if (this.#flagReturnTimers[team] <= 0) {
          this.#returnFlag(team);
          event = { type: 'flag_returned', team };
        }
      }
    }

    // Wave flag animation
    const t = performance.now() * 0.003;
    for (const team of ['red', 'blue']) {
      if (this.#flagMeshes[team]?.flag.visible) {
        this.#flagMeshes[team].flag.rotation.y = Math.sin(t) * 0.3;
      }
    }

    // Move carried flag with carrier
    const enemyTeam = this.getEnemyTeam();
    if (this.#flagCarrier[enemyTeam] === playerId) {
      // Local player carrying — flag follows them (invisible, shown in HUD)
    }

    // Check capture
    if (this.tryCapture(playerPos, playerId)) {
      event = { type: 'capture', team: this.localTeam, scores: { ...this.scores } };
    }

    // Check win
    if (this.scores.red >= Config.teams.ctfScoreToWin) event = { type: 'win', team: 'red' };
    if (this.scores.blue >= Config.teams.ctfScoreToWin) event = { type: 'win', team: 'blue' };

    return event;
  }

  getTeamScores() { return { ...this.scores }; }

  isCarrying(playerId) {
    return this.#flagCarrier.red === playerId || this.#flagCarrier.blue === playerId;
  }

  reset() {
    this.scores = { red: 0, blue: 0 };
    for (const team of ['red', 'blue']) {
      this.#flagCarrier[team] = null;
      this.#flagDropPositions[team] = null;
      this.#flagReturnTimers[team] = 0;
      this.#returnFlag(team);
    }
  }

  destroy() {
    for (const team of ['red', 'blue']) {
      if (this.#flagMeshes[team]) {
        const meshes = this.#flagMeshes[team];
        this.#scene.remove(meshes.pole);
        this.#scene.remove(meshes.flag);
        this.#scene.remove(meshes.base);
        disposeObject3D(meshes.pole);
        disposeObject3D(meshes.flag);
        disposeObject3D(meshes.base);
      }
    }
    this.#flagMeshes = {};
    this.#flagBases = {};
  }
}
