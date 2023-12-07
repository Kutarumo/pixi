import { Base } from "../libs/base.js";
import { RegisterScore } from "../ui/Register_score.js";
import { ScoreList } from "../ui/score_list.js";

/**
 * Represents the score menu in the game.
 * @extends Base
 */
class ScoreMenu extends Base {
    /**
     * Creates an instance of the ScoreMenu class.
     *
     * @param {PIXI.Application} app - The PIXI.Application instance.
     * @param {number} score - The score to be registered.
     */
    constructor(app, score) {
        super(app);
        this.users = []; // Array to store user data (if needed)
        this.score = score; // The score to be displayed in the menu
        this.addScore(); // Initialize and display the score-related UI elements
    }

    /**
     * Destroys the ScoreMenu instance.
     */
    destroy() {
        super.destroy(); // Call the destroy method of the base class
        this.add_score.removeEventListener(); // Remove event listeners from the RegisterScore instance
        this.app.stage.removeChild(this.add_score.textObj); // Remove the RegisterScore text object from the stage
        this.app.stage.removeChild(this.add_score_list.textObj); // Remove the ScoreList text object from the stage
    }

    /**
     * Initializes and displays the score-related UI elements.
     */
    addScore() {
        this.add_score = new RegisterScore(this, [400, 400], this.score); // Create a new RegisterScore instance
        this.add_score_list = new ScoreList(this, [400, 500]); // Create a new ScoreList instance
    }

    /**
     * Updates the ScoreMenu state.
     */
    update() {
        super.update(); // Call the update method of the base class
        this.add_score.update(); // Update the RegisterScore instance
        this.add_score_list.update(); // Update the ScoreList instance
    }
}

// Export the ScoreMenu class for use in other modules
export { ScoreMenu };
