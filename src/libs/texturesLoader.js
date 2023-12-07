/**
 * Handles the loading of textures for aliens, players, and bullets in the game.
 */
class TexturesLoader {
    /**
     * Creates an instance of the TexturesLoader class.
     */
    constructor() {
        // Initialize textures array with empty subarrays
        this.textures = [[[], [], [], []], [], [[], [], [], []]];
        
        // Base path for texture files
        this.BASE_PATH = './src/publics/';
        
        // Subfolders for each type of entity (alien, player, bullet)
        this.path_floder = ['alien', 'player', 'bullet'];

        // Load textures for aliens, players, and bullets
        this.loadAliens();
        this.loadPlayer();
        this.loadBullets();
    }

    /**
     * Loads textures for alien entities.
     */
    loadAliens() {
        // Iterate through alien types
        for (let i = 0; i <= 2; i++) {
            // Load textures for each frame of the alien animation
            this.textures[0][i].push(PIXI.Texture.from(this.BASE_PATH + "alien/" + (i + 1) + "-1.png"));
            this.textures[0][i].push(PIXI.Texture.from(this.BASE_PATH + "alien/" + (i + 1) + "-2.png"));
        }

        // Load texture for alien death animation
        this.textures[0].push(PIXI.Texture.from(this.BASE_PATH + "alien/death-1.png"));
    }

    /**
     * Loads textures for the player entity.
     */
    loadPlayer() {
        // Load texture for the player
        this.textures[1].push(PIXI.Texture.from(this.BASE_PATH + "player/Player.png"));
    }

    /**
     * Loads textures for bullet entities.
     */
    loadBullets() {
        // Load texture for the bullet
        this.textures[2][0].push(PIXI.Texture.from(this.BASE_PATH + "bullet/1-1.png"));
    }
}

// Export the TexturesLoader class for use in other modules
export { TexturesLoader };
