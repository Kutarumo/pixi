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

/**
 * Represents the main game class for the retro game.
 * @extends Base
 */
class RetroGame extends Base {
    /**
     * Creates an instance of the RetroGame class.
     * @param {PIXI.Application} app - The PIXI.Application instance.
     */
    constructor(app) {
        super(app);
        this.texturesLoader = new TexturesLoader();
        this.step = -10;
        this.nbStep = 15;
        this.trip = 0;
        this.delta = 0;
        this.score = 0;
        this.moveAlienSpeed = 500;
        this.loadEntities();
        this.textScore = new Score(this, [0, 0]);
    }

    /**
     * Loads the initial entities into the game.
     */
    loadEntities() {
        // Load aliens
        this.spawnAlien();

        // Load walls
        for (let i = 0; i < 4; i++) {
            const wall = new Wall(this, [70 + 175 * i, 500]);
        }

        // Load player and score entities
        this.addPoolEntity(new Player(this, [400, 600], 3, 3, 1, 3, this.texturesLoader.textures[1], 3, 0));
        
    }

    spawnAlien() {
        for (let row = 0; row < 11; row++) {
            // Create and add aliens to the entity pool
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 0 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], "alien_0", 3, 0, [row, 0]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 1 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_0", 3, 0, [row, 1]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 2 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_1", 3, 0, [row, 2]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 3 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_1", 3, 0, [row, 3]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 4 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_2", 3, 0, [row, 4]));
        }
    }

    /**
     * Causes an explosion in the wall entities within a specified radius.
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
                this.spawnAlien();
            } else if (aliens.length <= 27) {
                this.moveAlienSpeed = 250;
            }
            this.delta = 0;

            if (this.nbStep >= 15) {
                this.nbStep = 0;
                this.step *= -1;
                this.trip += 1;
                for (const alien of aliens) {
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

    gameover() {
        if (this.trip > 15) {
            this.destroy();
            new MainMenu(this.app);
        }
    }

    destroy() {
        super.destroy();
        this.app.stage.removeChild(this.textScore.textObj);
    }

    /**
     * Updates the game state.
     * @param {number} delta - The time since the last frame.
     */
    update(delta) {
        this.delta += delta;
        this.moveAlien();
        this.textScore.update();
        this.gameover();
        super.update(delta);
    }
}

// Export the RetroGame class for use in other modules
export { RetroGame };
