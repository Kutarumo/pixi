import { LivingEntity } from "../libs/LivingEntity.js";
import { Entity } from "../libs/Entity.js";
import { Alien } from "./Alien.js";
import { Player } from "./Player.js";
import { Brique } from "./Brique.js";

/**
 * Represents a bullet entity in the game.
 * @extends LivingEntity
 */
class Bullet extends LivingEntity {

    /**
     * Creates an instance of the Bullet class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the bullet.
     * @param {number} hp - The current health points of the bullet.
     * @param {number} max_hp - The maximum health points of the bullet.
     * @param {number} force - The force of the bullet.
     * @param {number} speed - The movement speed of the bullet.
     * @param {PIXI.AnimatedSprite} sprites - The animated sprites of the bullet.
     * @param {number} scale - The scale of the bullet.
     * @param {number} rotation - The initial rotation of the bullet.
     * @param {string} owner - The owner of the bullet (e.g., "player" or "alien").
     */
    constructor(game, coord, hp, max_hp, force, speed, sprites, scale, rotation, owner) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);
        this.owner = owner;
        this.addToScreen();
    }

    /**
     * Checks if the bullet overlaps with another entity.
     * @param {Entity} otherEntity - The other entity to check for overlap.
     * @returns {boolean} True if there is an overlap, false otherwise.
     */
    overlapsWith(otherEntity) {
        const x1 = this.coord[0] - this.sprite.width / 2;
        const y1 = this.coord[1] - this.sprite.height / 2;
        const width1 = this.sprite.width;
        const height1 = this.sprite.height;

        const x2 = otherEntity.sprite.x;
        const y2 = otherEntity.sprite.y;
        const width2 = otherEntity.sprite.width;
        const height2 = otherEntity.sprite.height;

        const overlapX = x1 < x2 + width2 && x1 + width1 > x2;
        const overlapY = y1 < y2 + height2 && y1 + height1 > y2;

        const overlap = overlapX && overlapY;

        return overlap;
    }

    changeToDeathAnimation() {
        
    }

    /**
     * Updates the state of the bullet.
     * @param {number} delta - The time difference since the last update.
     */
    update(delta) {
        // Accumulate time delta
        this.delta = delta;

        // Check conditions for bullet removal
        if (this.hp <= 0 || this.coord[1] < 0 || this.coord[1] > this.game.size) {
            this.remove();
            return;
        }

        // Check for collisions with other entities
        const entities = this.game.pool.filter(entity => entity instanceof Entity);
        for (const entity of entities) {
            if (
                this.overlapsWith(entity) &&
                this.owner !== entity.owner
            ) {
                // Handle specific behavior based on the type of entity
                if (entity instanceof Brique) {
                    this.game.explodeWall(this.coord, 25);
                } else {
                    entity.damage(1);
                }

                // Damage the bullet and exit the loop
                this.damage(1);
                return;
            }
        }

        // Update bullet position
        this.coord[1] -= this.speed;
        this.update_position();
    }
}

export { Bullet };
