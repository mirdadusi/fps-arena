/**
 * UIManager — controls overlay screens (blocker, game-over).
 */
export class UIManager {
  #blocker  = document.getElementById('blocker');
  #gameOver = document.getElementById('game-over');
  #goStats  = document.getElementById('go-stats');

  showBlocker()  { this.#blocker.style.display  = 'flex'; }
  hideBlocker()  { this.#blocker.style.display  = 'none'; }

  showGameOver(stats) {
    this.#goStats.textContent =
      `Score: ${stats.score}  |  Kills: ${stats.kills}  |  Time: ${stats.time}  |  Best Streak: ${stats.maxStreak}`;
    this.#gameOver.style.display = 'flex';
  }

  hideGameOver() { this.#gameOver.style.display = 'none'; }

  onGameOverClick(callback) {
    this.#gameOver.addEventListener('click', callback);
  }
}
