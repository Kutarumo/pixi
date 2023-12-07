import { extractFileName } from './Utils.js';

/**
 * Represents a basic entity in the game.
 */
class Entity {
    /**
     * Creates an instance of the Entity class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the entity.
     * @param {PIXI.AnimatedSprite} sprites - The animated sprites of the entity.
     * @param {number} scale - The scale of the entity.
     * @param {number} rotation - The initial rotation of the entity.
     */
    constructor(game, coord, sprites, scale, rotation) {
        this.game = game;
        this.coord = coord;

        // If sprites are provided, create an AnimatedSprite with scale and rotation
        if (sprites) {
            this.sprite = new PIXI.AnimatedSprite(sprites);
            this.sprite.scale.set(scale);
            this.sprite.rotation = rotation;
        }
    }

    /**
     * Adds the entity's sprite to the game screen.
     */
    addToScreen() {
        this.game.app.stage.addChild(this.sprite);
    }

    /**
     * Placeholder method to get a pool entity.
     * This method can be overridden in subclasses as needed.
     */
    getPoolEntity() {
        // Implementation specific to the entity type
    }

    /**
     * Removes the entity from the game.
     */
    remove() {
        // Remove the sprite from the game stage
        this.game.app.stage.removeChild(this.sprite);

        // Remove the entity from the game's entity pool
        this.game.removePoolEntity(this);

        // Destroy the sprite to free up resources
        this.sprite.destroy();
    }

    /**
     * Updates the position of the entity's sprite.
     */
    update_position() {
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
    }

    /**
     * Updates the state of the entity.
     * This method can be overridden in subclasses as needed.
     */
    update() {
        // By default, update only the position
        this.update_position();
    }
}

// Export the Entity class for use in other modules
export { Entity };
