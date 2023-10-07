import { Player } from './entity/Player.js';

const size = 500;

const app = new PIXI.Application({ width: size, height: size });
document.body.appendChild(app.view);

const player = new Player(app);

// Appel de la fonction updateSpritePosition à chaque rafraîchissement de l'écran
app.ticker.add(() => {
  player.update();
});
