import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";
import { TexturesLoader } from "../libs/texturesLoader.js";

/**
 * Represents a boss entity in the game.
 * @extends LivingEntity
 */
class Boss extends LivingEntity {
    /**
     * Creates an instance of the Boss class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the boss.
     * @param {number} hp - The current health points of the boss.
     * @param {number} max_hp - The maximum health points of the boss.
     * @param {number} force - The force of the boss.
     * @param {number} speed - The movement speed of the boss.
     * @param {PIXI.AnimatedSprite} sprites - The animated sprites of the boss.
     * @param {string} state - The state of the boss.
     * @param {number} scale - The scale of the boss.
     * @param {number} rotation - The initial rotation of the boss.
     * @param {number[]} coord_tuple - The coordinate tuple of the boss.
     */
    constructor(game, coord, hp, max_hp, force, speed, sprites, state, scale, rotation, coord_tuple) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);

        // Additional properties for Boss class
        this.coord_tuple = coord_tuple;
        this.owner = state;
        this.sprite.animationSpeed = 0.01;
        this.sprite.anchor.set(0.5);

        // Play the animation and Add sprite to screen
        this.sprite.play();
        this.addToScreen();
    }

    /**
     * Adds the boss sprite to the game screen.
     */
    addToScreen() {
        this.game.graphics.addChild(this.sprite);
    }

    /**
     * Removes the boss entity.
     */
    remove() {
        super.remove();
    }

    /**
     * Updates the state of the boss.
     */
    update() {
        // If the boss reaches the left edge of the screen, set its x-coordinate to the right edge
        if (this.coord_tuple[0] - this.sprite.width < 0) {
            this.coord_tuple[0] = this.game.screen.width;
        }

        // If the boss reaches the right edge of the screen, set its x-coordinate to the left edge
        if (this.coord_tuple[0] + this.sprite.width > this.game.screen.width) {
            this.coord_tuple[0] = 0 - this.sprite.width;
        }

        // Update the position of the boss
        this.update_position();
    }
}

export { Boss };
