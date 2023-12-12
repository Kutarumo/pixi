import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";
import { TexturesLoader } from "../libs/texturesLoader.js";

/**
 * Represents an alien entity in the game.
 * @extends LivingEntity
 */
class Alien extends LivingEntity {

    /**
     * Creates an instance of the Alien class.
     *
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the alien.
     * @param {number} hp - The current health points of the alien.
     * @param {number} max_hp - The maximum health points of the alien.
     * @param {number} force - The force of the alien.
     * @param {number} speed - The movement speed of the alien.
     * @param {PIXI.AnimatedSprite} sprites - The animated sprites of the alien.
     * @param {string} state - The state of the alien.
     * @param {number} scale - The scale of the alien.
     * @param {number} rotation - The initial rotation of the alien.
     * @param {number[]} coord_tuple - The coordinate tuple of the alien.
     * @param {number} score - The score value associated with the alien.
     */
    constructor(game, coord, hp, max_hp, force, speed, sprites, state, scale, rotation, coord_tuple, score) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);

        // Additional properties for Alien class
        this.coord_tuple = coord_tuple; // Array representing the coordinates of the alien
        this.owner = state; // String representing the owner state of the alien
        this.sprite.animationSpeed = 0.01; // Set the animation speed of the alien sprite
        this.sprite.anchor.set(0.5); // Set the anchor point of the sprite to the center
        this.delta = 0; // Initialize time delta
        this.score = score; // Score value associated with the alien

        // Play the animation and Add sprite to screen
        this.sprite.play(); // Start playing the animation
        this.addToScreen(); // Add the alien sprite to the game screen
    }

    /**
     * Handles actions to be performed on alien death.
     * Increases the game score by the specified score value when the alien dies.
     */
    onDeath() {
        this.game.score += this.score; // Increase the game score by the alien's score value
    }

    /**
     * Updates the state of the alien.
     *
     * @param {number} delta - The time difference since the last update.
     */
    update(delta) {
        this.delta += delta; // Accumulate time delta

        // Check if there is no alien below the current alien's position
        const alienBelow = this.game.pool.filter(alien => alien instanceof Alien).some(alien => this.coord_tuple[0] === alien.coord_tuple[0] && this.coord_tuple[1] + 1 === alien.coord_tuple[1]);

        // If no alien below, there is a 5% chance to shoot a bullet
        if (!alienBelow && generateRandomBoolean(0.05)) {
            // Create a new bullet and add it to the game's entity pool
            this.game.addPoolEntity(new Bullet(this.game, [...this.coord], 1, 1, 1, -3, this.game.texturesLoader.textures[2][0], 3, 0, this.owner));
        }

        // Update the position of the alien
        this.update_position();
    }
}

export { Alien };
