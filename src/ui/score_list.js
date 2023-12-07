/**
 * Represents a score list in the game.
 */
class ScoreList {
    /**
     * Creates an instance of the ScoreList class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the score list.
     */
    constructor(game, coord) {
        this.game = game;
        this.coord = coord;

        // Define the text style for the score list
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'white',
        });

        // Create a PIXI.Text object for the score list with the specified style
        this.textObj = new PIXI.Text(this.generateScoreText(), this.style);

        // Set the initial position of the text object
        this.textObj.x = this.coord[0];
        this.textObj.y = this.coord[1];

        // Center the text horizontally
        this.textObj.anchor.x = 0.5;

        // Add the score list to the game screen
        this.addToScreen();
        this.generateScoreText();
    }

    /**
     * Generates the text for the score list.
     * @returns {string} - The formatted score list text.
     */
    generateScoreText() {
        // Check if there are existing users in localStorage
        const storedUsers = localStorage.getItem('users');

        // Parse the storedUsers from JSON to an array
        const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

        // Sort the users by score in descending order
        const sortedUsers = usersArray.slice().sort((a, b) => b.score - a.score);

        // Generate the text for the score list
        let scoreText = "Score List:\n";
        sortedUsers.forEach((user, index) => {
            scoreText += `${index + 1}. ${user.name}: ${user.score}\n`;
        });

        return scoreText;
    }


    /**
     * Updates the score list text and re-renders it on the screen.
     */
    update() {
        this.textObj.text = this.generateScoreText();
    }

    /**
     * Adds the score list to the game screen.
     */
    addToScreen() {
        this.game.app.stage.addChild(this.textObj);
    }
}

// Export the ScoreList class for use in other modules
export { ScoreList };
