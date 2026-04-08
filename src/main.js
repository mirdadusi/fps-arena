import { LobbyUI } from './ui/LobbyUI.js';
import { Game } from './Game.js';

const lobby = new LobbyUI();
let currentGame = null;

lobby.onStart(config => {
  lobby.hide();
  if (currentGame) { currentGame.destroy(); currentGame = null; }
  currentGame = new Game(config, () => {
    currentGame.destroy();
    currentGame = null;
    lobby.show();
  });
});
