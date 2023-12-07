import { MainMenu } from "./src/game_mode/main_menu.js";
import { RetroGame } from "./src/game_mode/retro.js";

/**
 * Set the PIXI scaling mode to NEAREST for a retro-pixelated effect.
 */
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

/**
 * Create a PIXI Application with a specified width and height.
 * @type {PIXI.Application}
 */
const app = new PIXI.Application({ width: 800, height: 800 });

// Uncomment one of the following lines to choose the game mode.
// const game = new MainMenu(app);
const game = new RetroGame(app);

/**
 * The main game loop function. Requests the next animation frame and keeps the game running.
 */
function gameLoop() {
    requestAnimationFrame(gameLoop);
}

// Start the game loop.
gameLoop();