import { MainMenu } from '../game_mode/main_menu.js';

/**
 * Represents the score display in the game.
 */
class RegisterScore {
    /**
     * Creates an instance of the Score class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the score display.
     */
    constructor(game, coord, score) {
        this.game = game;
        this.coord = coord;
        this.score = score;

        // Define the text style for the score display
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });

        // Set the default text for the score display
        this.text = "Rentre ton pseudo :\n";



        // Create the text object and add it to the screen
        this.createText();
        // Center the text horizontally and vertically
        this.textObj.anchor.set(0.5);
        this.setupEventListeners();
        this.addToScreen();
    }

    /**
     * Sets up event listeners for keyboard input.
     */
    setupEventListeners() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    /**
     * Removes event listeners for keyboard input.
     */
    removeEventListener() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    /**
     * Handles keydown events for player movement and shooting.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeyDown = (event) => {
        console.log(event.key);
        if (event.key.length === 1 && this.text.length - "Rentre ton pseudo :\n".length < 3) {
            this.text += event.key;
            this.update();
        }
        if (event.key === 'Backspace') {
            // Check if the last character is not a newline character
            if (this.text.slice(-1) !== '\n') {
                // Remove the last character from the text
                this.text = this.text.slice(0, -1);
                this.update();
            }
        }
        if (event.key === 'Enter') {
            // Handle the Enter key to save the pseudo and score
            this.savePseudo();
        }
    }

    /**
     * Saves the current pseudo and score.
     */
    savePseudo() {
        // Extract the pseudo from the current text (excluding the default text)
        const pseudo = this.text.slice("Rentre ton pseudo :\n".length);

        // Create a user object with the pseudo and the current score
        const user = { 'name': pseudo, 'score': this.score };

        // Check if there are existing users in localStorage
        const storedUsers = localStorage.getItem('users');
        let users = [];

        if (storedUsers) {
            // Parse the existing users from localStorage
            users = JSON.parse(storedUsers);
        }

        // Add the new user to the array of users
        users.push(user);

        // Save the updated 'users' array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        this.game.destroy();
        new MainMenu(this.game.app);
    }

    /**
     * Creates the PIXI.Text object with the current score.
     */
    createText() {
        this.textObj = new PIXI.Text(this.text, this.style);
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
        this.textObj.text = this.text;
    }
}

// Export the Score class for use in other modules
export { RegisterScore };
