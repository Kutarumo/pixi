/**
 * Represents a start game button in the game.
 */
class StartGame {
    /**
     * Creates an instance of the StartGame class.
     *
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the start game button.
     */
    constructor(game, coord) {
        this.game = game; // Reference to the game instance
        this.coord = coord; // Initial coordinates of the start game button

        // Define the text style for the button
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });

        // Set the default text for the button
        this.text = "Start Game";

        // Create a PIXI.Text object with the specified style and text
        this.textObj = new PIXI.Text(this.text, this.style);

        // Set the initial position of the text object
        this.textObj.x = this.coord[0];
        this.textObj.y = this.coord[1];

        // Center the text horizontally and vertically
        this.textObj.anchor.set(0.5);

        // Add the start game button to the game screen
        this.addToScreen();
    }

    /**
     * Adds the start game button to the game screen.
     */
    addToScreen() {
        this.game.app.stage.addChild(this.textObj);
    }
}

// Export the StartGame class for use in other modules
export { StartGame };
