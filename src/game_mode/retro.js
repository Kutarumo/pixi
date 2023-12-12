import { Player } from '../entity/Player.js';
import { Score } from '../ui/Score.js';
import { Alien } from '../entity/Alien.js';
import { TexturesLoader } from '../libs/texturesLoader.js';
import { Base } from '../libs/base.js';
import { Boss } from '../entity/Boss.js';
import { Wall } from '../entity/Wall.js';
import { LivingEntity } from '../libs/LivingEntity.js';
import { Brique } from '../entity/Brique.js';
import { MainMenu } from './main_menu.js';
import { ScoreMenu } from './score_menu.js';

/**
 * Represents the main game class for the retro game.
 * @extends Base
 */
class RetroGame extends Base {
    /**
     * Creates an instance of the RetroGame class.
     *
     * @param {PIXI.Application} app - The PIXI.Application instance.
     */
    constructor(app) {
        super(app);
        this.texturesLoader = new TexturesLoader(); // Load textures for game entities
        this.step = -10; // Initial step for alien movement
        this.nbStep = 15; // Number of steps for alien movement
        this.trip = 0; // Trip count for alien movement
        this.delta = 0; // Time delta since the last frame
        this.score = 0; // Current game score
        this.moveAlienSpeed = 100; // Speed at which aliens move
        this.loadEntities(); // Load initial entities into the game
        this.textScore = new Score(this, [0, 0]); // Initialize the game score display
    }

    /**
     * Loads the initial entities into the game.
     */
    loadEntities() {
        // Load aliens
        this.spawnAlien();

        // Load walls
        for (let i = 0; i < 4; i++) {
            const wall = new Wall(this, [70 + 175 * i, 500]); // Create and add walls to the entity pool
        }

        // Load player and score entities
        this.addPoolEntity(new Player(this, [400, 600], 3, 3, 1, 3, this.texturesLoader.textures[1][0], 3, 0));
    }

    /**
     * Spawns aliens in predefined patterns.
     */
    spawnAlien() {
        for (let row = 0; row < 11; row++) {
            // Create and add aliens to the entity pool
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 0 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], "alien_0", 3, 0, [row, 0], 50));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 1 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_0", 3, 0, [row, 1], 20));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 2 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_1", 3, 0, [row, 2], 20));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 3 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_1", 3, 0, [row, 3], 10));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 4 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_2", 3, 0, [row, 4], 10));
        }
    }

    /**
     * Causes an explosion in the wall entities within a specified radius.
     *
     * @param {number[]} coord - The coordinates of the explosion.
     * @param {number} radius - The radius of the explosion.
     */
    explodeWall(coord, radius) {
        const entities = this.pool.filter(entity => entity instanceof Brique);
        for (const entity of entities) {
            const dist = Math.sqrt((entity.coord[0] - coord[0]) ** 2 + (entity.coord[1] - coord[1]) ** 2);
            if (dist < radius) {
                const distRel = dist / radius;
                if (Math.random() < distRel) {
                    entity.damage(1);
                }
            }
        }
    }

    /**
     * Moves the aliens based on a step and a number of steps.
     */
    moveAlien() {
        if (this.delta >= this.moveAlienSpeed) {
            const aliens = this.pool.filter(alien => alien instanceof Alien);
            if (aliens.length === 0) {
                this.spawnAlien(); // Respawn aliens if none are left
            } else if (aliens.length <= 27) {
                this.moveAlienSpeed = 250; // Increase alien movement speed if certain conditions are met
            }
            this.delta = 0;

            if (this.nbStep >= 15) {
                this.nbStep = 0;
                this.step *= -1;
                this.trip += 1;
                for (const alien of aliens) {
                    if (alien.coord[1] >= 470) {
                        this.gameover();
                    }
                    alien.coord[1] += Math.abs(this.step);
                    alien.coord[0] += this.step / Math.abs(this.step / 2);
                }
            } else {
                this.nbStep += 1;
                for (const alien of aliens) {
                    alien.coord[0] += this.step;
                }
            }
        }
    }

    /**
     * Checks for game over conditions and ends the game if necessary.
     */
    gameover() {
        this.destroy(); // Clean up and end the game
        new ScoreMenu(this.app, this.score); // Display the score menu
    }

    /**
     * Destroys the game instance.
     */
    destroy() {
        super.destroy();
        this.app.stage.removeChild(this.textScore.textObj); // Remove the score display from the stage
    }

    /**
     * Updates the game state.
     *
     * @param {number} delta - The time since the last frame.
     */
    update(delta) {
        this.delta += delta;
        this.moveAlien();
        this.textScore.update();
        super.update(delta);
    }
}

// Export the RetroGame class for use in other modules
export { RetroGame };
