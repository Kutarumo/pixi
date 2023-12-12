import { Entity } from "./Entity.js";

/**
 * Represents a living entity in the game.
 * @extends Entity
 */
class LivingEntity extends Entity {
    /**
     * Creates an instance of the LivingEntity class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the living entity.
     * @param {number} hp - The current health points of the living entity.
     * @param {number} max_hp - The maximum health points of the living entity.
     * @param {number} force - The force of the living entity.
     * @param {number} speed - The movement speed of the living entity.
     * @param {PIXI.AnimatedSprite} sprites - The animated sprites of the living entity.
     * @param {number} scale - The scale of the living entity.
     * @param {number} rotation - The initial rotation of the living entity.
     */
    constructor(game, coord, hp, max_hp, force, speed, sprites, scale, rotation) {
        // Initialize the base class (Entity)
        super(game, coord, sprites, scale, rotation);

        // Additional properties for LivingEntity class
        this.max_hp = max_hp;
        this.hp = hp;
        this.force = force;
        this.speed = speed;
    }

    /**
     * Callback method called when the living entity dies.
     */
    onDeath() {}

    changeToDeathAnimation() {
        this.sprite.textures = this.game.texturesLoader.textures[0][3];
        this.sprite.animationSpeed = 0.06;
        this.sprite.play();
    }

    /**
     * Inflicts damage to the living entity.
     * @param {number} damage - The amount of damage to inflict.
     */
    damage(damage) {
        // Reduce the health points based on the damage received
        this.hp -= damage;
        this.changeToDeathAnimation();
        // Check if the living entity has run out of health points
        if (this.hp <= 0) {
            // Call the onDeath callback
            this.onDeath();

            // Remove the living entity from the game
            setTimeout(() => this.remove(), 400)
            return;
        }
    }
}

// Export the LivingEntity class for use in other modules
export { LivingEntity };
