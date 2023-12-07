/**
 * Represents the score display in the game.
 */
class Score {
    /**
     * Creates an instance of the Score class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the score display.
     */
    constructor(game, coord) {
        this.game = game;
        this.coord = coord;

        // Define the text style for the score display
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });

        // Set the default text for the score display
        this.text = "Score : ";

        // Create the text object and add it to the screen
        this.createText();
        this.addToScreen();
    }

    /**
     * Creates the PIXI.Text object with the current score.
     */
    createText() {
        this.textObj = new PIXI.Text(this.text + this.game.score.toString(), this.style);
        this.textObj.x = this.coord[0];
        this.textObj.y = this.coord[1];
    }

    /**
     * Adds the score display to the game screen.
     */
    addToScreen() {
        this.game.app.stage.addChild(this.textObj);
    }

    /**
     * Updates the score displayed on the screen.
     */
    update() {
        this.textObj.text = this.text + this.game.score.toString();
    }
}

// Export the Score class for use in other modules
export { Score };
