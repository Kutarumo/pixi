import { StartGame } from "../ui/start_game.js";
import { ScoreGame } from "../ui/score_game.js";
import { Base } from "../libs/base.js";
import { RetroGame } from "./retro.js";
import { ScoreMenu } from "./score_menu.js";


/**
 * @module MainMenu
 */

/**
 * Represents the main menu of the game.
 * @extends Base
 */
class MainMenu extends Base {
    /**
     * Creates an instance of the MainMenu class.
     * @param {PIXI.Application} app - The PIXI.Application instance.
     */
    constructor(app) {
        super(app);

        // Set up the menu
        this.setupMenu();

        // Configure interaction for the start game button
        this.start_game.textObj.interactive = true;
        this.start_game.textObj.buttonMode = true;
        this.start_game.textObj.on("pointerdown", (event) => {
            this.destroy();
            new RetroGame(this.app);
        });
        // Configure interaction for the start game button
        this.score_game.textObj.interactive = true;
        this.score_game.textObj.buttonMode = true;
        this.score_game.textObj.on("pointerdown", (event) => {
            this.destroy();
            new ScoreMenu(this.app);
        });

        // Add the start game button to the screen
        this.start_game.addToScreen();
        this.score_game.addToScreen();
    }

    destroy() {
        super.destroy();
        this.app.stage.removeChild(this.start_game.textObj);
        this.app.stage.removeChild(this.score_game.textObj);
    }

    /**
     * Sets up the menu components.
     */
    setupMenu() {
        this.start_game = new StartGame(this, [400, 400]);
        this.score_game = new ScoreGame(this, [400, 500]);
    }
}

// Export the MainMenu class for use in other modules
export { MainMenu };
