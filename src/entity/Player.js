import { MainMenu } from "../game_mode/main_menu.js";
import { ScoreMenu } from "../game_mode/score_menu.js";
import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';

/**
 * Represents the player entity in the game.
 * @extends LivingEntity
 */
class Player extends LivingEntity {

    /**
     * Creates an instance of the Player class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the player.
     * @param {number} hp - The current health points of the player.
     * @param {number} max_hp - The maximum health points of the player.
     * @param {number} force - The force of the player.
     * @param {number} speed - The movement speed of the player.
     * @param {PIXI.AnimatedSprite} sprites - The animated sprites of the player.
     * @param {number} scale - The scale of the player.
     * @param {number} rotation - The initial rotation of the player.
     */
    constructor(game, coord, hp, max_hp, force, speed, sprites, scale, rotation) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);

        // Keyboard input flags
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;

        // Player-specific properties
        this.owner = "player";
        this.isHit = false;
        this.hitTime = 0;

        // Set up event listeners
        this.setupEventListeners();

        // Start the player sprite animation
        this.sprite.play();

        // Add the player to the game screen
        this.addToScreen();
    }

    /**
     * Handles actions to be performed on player death.
     */
    onDeath() {
        this.removeEventListener();
        this.game.destroy();
        new ScoreMenu(this.game.app, this.game.score);
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
        if (event.key === 'ArrowLeft') {
            this.isLeftKeyDown = true;
        } else if (event.key === 'ArrowRight') {
            this.isRightKeyDown = true;
        }
    }

    /**
     * Handles keyup events to stop player movement.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeyUp = (event) => {
        if (event.key === 'ArrowLeft') {
            this.isLeftKeyDown = false;
        } else if (event.key === 'ArrowRight') {
            this.isRightKeyDown = false;
        } else if (event.key == ' ') {
            // Shoot a bullet if space key is pressed
            if (!this.game.pool.filter(bullet => bullet instanceof Bullet).some(bullet => bullet.owner === this.owner)) {
                // Create a new bullet and add it to the game's entity pool
                this.game.addPoolEntity(new Bullet(this.game, [this.coord[0] + this.sprite.width / 2, this.coord[1]], 1, 1, 1, 3, this.game.texturesLoader.textures[2][0], 3, 0, this.owner));
            }
        }
    }

    /**
     * Handles player movement based on keyboard input.
     */
    movement() {
        if (this.isLeftKeyDown && this.coord[0] - this.speed >= 0) {
            this.coord[0] -= this.speed;
        }
        if (this.isRightKeyDown && this.coord[0] + this.sprite.width + this.speed <= this.game.app.renderer.width) {
            this.coord[0] += this.speed;
        }
    }

    /**
     * Updates the player state.
     * @param {number} delta - The time difference since the last update.
     */
    update(delta) {
        // Handle player movement
        this.movement();
        
        // Update the base class (LivingEntity)
        super.update();
    }
}

export { Player };