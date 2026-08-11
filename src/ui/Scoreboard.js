/**
 * Scoreboard — Tab-key overlay showing all player/bot scores.
 */
export class Scoreboard {
  #el   = document.getElementById('scoreboard');
  #body = document.getElementById('scoreboard-body');
  #lifetime = new Lifetime();

  constructor() {
    this.#lifetime.listen(document, 'keydown', e => {
      if (e.code === 'Tab') { e.preventDefault(); this.show(); }
    });
    this.#lifetime.listen(document, 'keyup', e => {
      if (e.code === 'Tab') this.hide();
    });
  }

  show() { if (this.#el) this.#el.style.display = 'flex'; }
  hide() { if (this.#el) this.#el.style.display = 'none'; }

  update(players) {
    if (!this.#body || !this.#el || this.#el.style.display === 'none') return;
    this.#body.innerHTML = '';
    const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
    for (const p of sorted) {
      const tr = document.createElement('tr');
      if (p.isLocal) tr.classList.add('local-player');
      tr.innerHTML = `<td style="color:${this.#esc(String(p.color || '#fff'))}">${this.#esc(p.name)}</td><td>${Number(p.kills) || 0}</td><td>${Number(p.deaths) || 0}</td><td>${Number(p.score) || 0}</td>`;
      this.#body.appendChild(tr);
    }
  }

  #esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  destroy() {
    this.hide();
    this.#lifetime.dispose();
  }
}
import { Lifetime } from '../core/Lifetime.js';
