import { Player } from '../entity/Player.js';
import { Score } from '../ui/Score.js';
import { GameMenu } from '../ui/game_menu.js';
import { Alien } from '../entity/Alien.js';
import { TexturesLoader } from '../libs/texturesLoader.js';
import { Base } from './base.js';
import { Boss } from '../entity/Boss.js';
import { Wall } from '../entity/Wall.js';
import { LivingEntity } from '../libs/LivingEntity.js';
import { Brique } from '../entity/Brique.js';

class RetroGame extends Base {
    constructor(size) {
        super(size);
        this.texturesLoader = new TexturesLoader();
        this.step = -10;
        this.nbStep = 15;
        this.delta = 0;
        this.score = 0;
        this.loadEntities();
    }

    loadEntities() {
        for (let row = 0; row < 11; row++) {
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 0 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], "alien_0", 3, 0, [row, 0]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 1 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_0", 3, 0, [row, 1]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 2 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_1", 3, 0, [row, 2]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 3 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_1", 3, 0, [row, 3]));
            this.addPoolEntity(new Alien(this, [row * 50 + 70, 4 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_2", 3, 0, [row, 4]));
        }
        for (let i=0;i<4;i++) {
            const wall = new Wall(this, [70 + 175*i, 500]);
        }
        this.addPoolEntity(new Player(this, [400,600], 3, 3, 1, 3, this.texturesLoader.textures[1], 3, 0));
        this.addPoolEntity(new Score(this, [0, 0]));
    }

    explodeWall(coord, radius) {
        const entities = this.pool.filter(entity => entity instanceof Brique);
        for (const entity of entities) {
            const dist = Math.sqrt((entity.coord[0] - coord[0])**2 + (entity.coord[1] - coord[1])**2);
            if (dist < radius) {
                const distRel = dist/radius;
                if (Math.random() < distRel) {
                    entity.damage(1);
                }
            }
        }
    }

    moveAlien() {
        if (this.delta >= 500) {
            const aliens = this.pool.filter(alien => alien instanceof Alien);
            this.delta = 0;
            if (this.nbStep >= 15) {
                this.nbStep = 0;
                this.step *= -1;
                for (const alien of aliens) {
                    alien.coord[1] += Math.abs(this.step);
                    alien.coord[0] += this.step/Math.abs(this.step/2);
                }
            } else {
                this.nbStep += 1;
                for (const alien of aliens) {
                    alien.coord[0] += this.step;
                }
            }
        }
    }

    update(delta) {
        this.delta += delta;
        this.moveAlien();
        super.update(delta);
    }

}

export { RetroGame };