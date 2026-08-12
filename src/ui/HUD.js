import { Config } from '../Config.js';
import { Lifetime } from '../core/Lifetime.js';

/**
 * HUD — reads game state and writes to DOM elements.
 * Shows weapon info, grenade count, team scores, and powerup indicators.
 */
export class HUD {
  #els;
  #lifetime = new Lifetime();
  #powerupSlots = [];

  constructor() {
    this.#els = {
      health:     document.getElementById('player-health'),
      hpBar:      document.getElementById('player-hp-bar'),
      ammo:       document.getElementById('player-ammo'),
      score:      document.getElementById('hud-score'),
      kills:      document.getElementById('hud-kills'),
      timer:      document.getElementById('hud-timer'),
      enemyBar:   document.getElementById('enemy-health-bar'),
      diffBadge:  document.getElementById('difficulty-badge'),
      hitMarker:  document.getElementById('hitmarker'),
      killFeed:   document.getElementById('kill-feed'),
      powerupBar: document.getElementById('powerup-bar'),
      weaponName: document.getElementById('weapon-name'),
      grenadeCount: document.getElementById('grenade-count'),
      teamScores: document.getElementById('team-scores'),
      weaponSlots: document.getElementById('weapon-slots'),
    };
    this.#preparePowerupSlots();
  }

  update(state, diff) {
    const hp = Math.max(0, Math.ceil(state.playerHP));
    this.#els.health.textContent = hp;
    const pct = state.playerHP / Config.player.maxHP * 100;
    this.#els.hpBar.style.width = pct + '%';

    if (state.playerHP < 30) {
      this.#els.health.style.color = '#f44';
      this.#els.hpBar.style.background = 'linear-gradient(90deg, #f44, #f66)';
    } else if (state.playerHP < 60) {
      this.#els.health.style.color = '#fc0';
      this.#els.hpBar.style.background = 'linear-gradient(90deg, #fc0, #fd0)';
    } else {
      this.#els.health.style.color = '#4f4';
      this.#els.hpBar.style.background = 'linear-gradient(90deg, #4f4, #2d2)';
    }

    this.#els.ammo.textContent = state.reloading ? 'RE...' : state.ammo;
    this.#els.enemyBar.style.width = (state.enemyHP / diff.enemyHP * 100) + '%';
    this.#els.score.textContent = state.score;
    this.#els.kills.textContent = state.kills;

    const mins = Math.floor(state.gameTime / 60);
    const secs = Math.floor(state.gameTime % 60).toString().padStart(2, '0');
    this.#els.timer.textContent = `${mins}:${secs}`;

    this.#els.diffBadge.textContent = diff.name;
    this.#els.diffBadge.style.color = diff.color;
    this.#els.diffBadge.style.borderColor = diff.color;
    this.#els.diffBadge.style.background = diff.color + '22';

    // Weapon name
    if (this.#els.weaponName) {
      this.#els.weaponName.textContent = state.weaponName || 'Assault Rifle';
    }

    // Weapon slots
    if (this.#els.weaponSlots) {
      const slots = this.#els.weaponSlots.children;
      for (let i = 0; i < slots.length; i++) {
        slots[i].classList.toggle('active', i === (state.weaponIndex ?? 0));
      }
    }

    // Grenade count
    if (this.#els.grenadeCount) {
      this.#els.grenadeCount.textContent = state.grenades ?? 0;
    }

    // Team scores
    if (this.#els.teamScores && state.teamScores) {
      this.#els.teamScores.style.display = 'flex';
      this.#els.teamScores.innerHTML =
        `<span class="team-red">RED ${state.teamScores.red}</span>` +
        `<span class="team-sep">-</span>` +
        `<span class="team-blue">${state.teamScores.blue} BLUE</span>`;
    } else if (this.#els.teamScores) {
      this.#els.teamScores.style.display = 'none';
    }

    this.#updatePowerups(state.activeEffects || []);
  }

  #updatePowerups(effects) {
    for (let i = 0; i < this.#powerupSlots.length; i++) {
      const slot = this.#powerupSlots[i];
      const e = effects[i];
      if (!e) {
        slot.el.style.display = 'none';
        continue;
      }
      const pct = Math.max(0, (e.remaining / e.total) * 100);
      slot.el.style.display = 'block';
      slot.el.style.borderColor = e.css;
      slot.name.style.color = e.css;
      slot.name.textContent = e.name;
      slot.fill.style.width = `${pct}%`;
      slot.fill.style.background = e.css;
      slot.time.textContent = `${e.remaining.toFixed(1)}s`;
    }
  }

  /** Allocate the maximum three timed-effect rows before gameplay begins. */
  #preparePowerupSlots() {
    const bar = this.#els.powerupBar;
    if (!bar) return;
    bar.replaceChildren();
    for (let i = 0; i < 3; i++) {
      const el = document.createElement('div');
      el.className = 'powerup-indicator';
      el.style.display = 'none';
      const name = document.createElement('div');
      name.className = 'powerup-name';
      const timerBg = document.createElement('div');
      timerBg.className = 'powerup-timer-bg';
      const fill = document.createElement('div');
      fill.className = 'powerup-timer-fill';
      const time = document.createElement('div');
      time.className = 'powerup-time';
      timerBg.appendChild(fill);
      el.append(name, timerBg, time);
      bar.appendChild(el);
      this.#powerupSlots.push({ el, name, fill, time });
    }
  }

  flashHitMarker() {
    this.#els.hitMarker.classList.add('show');
    this.#lifetime.timeout(() => this.#els.hitMarker.classList.remove('show'), 120);
  }

  flashDamage() {
    const el = document.getElementById('damage-overlay');
    el.classList.add('hit');
    this.#lifetime.timeout(() => el.classList.remove('hit'), 150);
  }

  showKillMessage() {
    const el = document.getElementById('kill-message');
    el.style.display = 'block';
    return () => { el.style.display = 'none'; };
  }

  addKillFeed(text) {
    const entry = document.createElement('div');
    entry.className = 'kill-feed-entry';
    entry.textContent = text;
    this.#els.killFeed.appendChild(entry);
    this.#lifetime.timeout(() => entry.remove(), 3200);
  }

  clearKillFeed() {
    this.#els.killFeed.innerHTML = '';
  }

  destroy() {
    this.#lifetime.dispose();
    this.clearKillFeed();
    this.#els.hitMarker?.classList.remove('show');
    document.getElementById('damage-overlay')?.classList.remove('hit');
    this.#powerupSlots.length = 0;
  }
}
