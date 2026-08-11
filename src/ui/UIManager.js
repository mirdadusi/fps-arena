import { Lifetime } from '../core/Lifetime.js';
import { PersistenceStore } from '../stores/PersistenceStore.js';

/**
 * UIManager — controls overlay screens (blocker, game-over).
 */
export class UIManager {
  #blocker        = document.getElementById('blocker');
  #gameOver       = document.getElementById('game-over');
  #goStats        = document.getElementById('go-stats');
  #goPersonalBest = document.getElementById('go-personal-best');
  #goScoreTable   = document.getElementById('go-scoretable');
  #lifetime       = new Lifetime();

  showBlocker()  { this.#blocker.style.display  = 'flex'; }
  hideBlocker()  { this.#blocker.style.display  = 'none'; }

  showGameOver(stats) {
    // Save before checking personal best
    const prevBest = PersistenceStore.getScores()[0]?.score ?? 0;
    PersistenceStore.saveScore({
      score: stats.score,
      kills: stats.kills,
      time: stats.time,
      maxStreak: stats.maxStreak,
      date: new Date().toLocaleDateString(),
    });

    this.#goStats.textContent =
      `Score: ${stats.score}  |  Kills: ${stats.kills}  |  Time: ${stats.time}  |  Best Streak: ${stats.maxStreak}`;

    if (this.#goPersonalBest) {
      this.#goPersonalBest.style.display = stats.score > prevBest ? 'block' : 'none';
    }

    if (this.#goScoreTable) {
      const top5 = PersistenceStore.getScores().slice(0, 5);
      let html = `<table style="border-collapse:collapse;width:100%;font-size:14px;color:#ddd;">
        <thead><tr style="color:#f80;">
          <th style="padding:4px 10px;">#</th>
          <th style="padding:4px 10px;">Score</th>
          <th style="padding:4px 10px;">Kills</th>
          <th style="padding:4px 10px;">Time</th>
          <th style="padding:4px 10px;">Date</th>
        </tr></thead><tbody>`;
      top5.forEach((e, i) => {
        const isNew = e.score === stats.score && e.kills === stats.kills;
        const rowStyle = isNew ? 'color:#fc0;font-weight:bold;' : '';
        html += `<tr style="${rowStyle}">
          <td style="padding:3px 10px;">${i + 1}</td>
          <td style="padding:3px 10px;">${e.score}</td>
          <td style="padding:3px 10px;">${e.kills}</td>
          <td style="padding:3px 10px;">${e.time}</td>
          <td style="padding:3px 10px;">${e.date}</td>
        </tr>`;
      });
      html += '</tbody></table>';
      this.#goScoreTable.innerHTML = html;
    }

    this.#gameOver.style.display = 'flex';
  }

  hideGameOver() { this.#gameOver.style.display = 'none'; }

  onGameOverClick(callback) {
    this.#lifetime.listen(this.#gameOver, 'click', callback);
  }

  destroy() {
    this.#lifetime.dispose();
    this.hideGameOver();
    this.hideBlocker();
  }
}
