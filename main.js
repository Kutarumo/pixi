import { RetroGame } from "./src/game_mode/retro.js";


const game = new RetroGame();

function gameLoop() {
    requestAnimationFrame(gameLoop);
}
  
gameLoop();