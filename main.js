import { MainMenu } from "./src/game_mode/main_menu.js";
import { RetroGame } from "./src/game_mode/retro.js";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const app = new PIXI.Application({ width: 800, height: 800 });
// const game = new RetroGame(app);
const game = new MainMenu(app);

function gameLoop() {
    requestAnimationFrame(gameLoop);
}
  
gameLoop();