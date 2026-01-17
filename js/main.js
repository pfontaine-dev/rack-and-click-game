import { Game } from './game.js';
import { UI } from './ui.js';
import { gameConfig } from './config.js';

// Initialisation du jeu
const game = new Game();
game.load(); // Charger la sauvegarde si elle existe

// Initialisation de l'interface
const ui = new UI(game);
ui.update();

// Boucle de jeu principale
setInterval(() => {
  game.tick();
  ui.update();
}, gameConfig.tickRate);

// Sauvegarde automatique
setInterval(() => {
  game.save();
}, gameConfig.saveInterval);

// Sauvegarde avant de quitter la page
window.addEventListener('beforeunload', () => {
  game.save();
});