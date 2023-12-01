import { RetroGame } from "./src/game_mode/retro.js";
import { TestGame } from "./src/game_mode/test.js";


const game = new RetroGame(800);
//const game = new TestGame(800);

function gameLoop() {
    requestAnimationFrame(gameLoop);
}
  
gameLoop();