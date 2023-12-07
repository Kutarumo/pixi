import { StartGame } from "../ui/start_game.js";
import { Base } from "../libs/base.js";


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
            console.log("click");
            // Add logic to transition to the game or perform other actions on button click
        });

        // Add the start game button to the screen
        this.start_game.addToScreen();
    }

    /**
     * Sets up the menu components.
     */
    setupMenu() {
        this.start_game = new StartGame(this, [400, 400]);
    }
}

// Export the MainMenu class for use in other modules
export { MainMenu };
