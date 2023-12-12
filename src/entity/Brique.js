import { LivingEntity } from "../libs/LivingEntity.js";

/**
 * Represents a brick entity in the game, part of a wall.
 * @extends LivingEntity
 */
class Brique extends LivingEntity {
    /**
     * Creates an instance of the Brique class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the brick.
     * @param {number} width - The width of the brick.
     * @param {number} height - The height of the brick.
     */
    constructor(game, coord, width, height) {
        // Initialize the base class (LivingEntity)
        super(game, coord, 1, 1, 0, 0, null, 1, 0);

        // Set the owner of the brick
        this.owner = "wall";

        // Create a PIXI.Sprite using a white texture
        this.sprite = PIXI.Sprite.from(PIXI.Texture.WHITE);
        
        // Set the initial position and dimensions of the sprite
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
        this.sprite.width = width;
        this.sprite.height = height;
    }

    changeToDeathAnimation() {

    }
}

export { Brique };
