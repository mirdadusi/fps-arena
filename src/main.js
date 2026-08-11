import { LobbyUI } from './ui/LobbyUI.js';
import { Game } from './Game.js';

try {
  const lobby = new LobbyUI();
  let currentGame = null;

  lobby.onStart(config => {
    lobby.hide();
    if (currentGame) { currentGame.destroy(); currentGame = null; }
    currentGame = new Game(config, () => {
      const game = currentGame;
      currentGame = null;
      game?.destroy();
      lobby.show();
    });
  });

  // The lobby is now interactive; match resources wait until Start.
  if (window.__arenaReady) window.__arenaReady();
  else document.getElementById('loading-overlay')?.remove();
} catch (error) {
  window.__arenaFail?.(error);
  throw error;
}
