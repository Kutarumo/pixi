import { Player } from '../entity/Player.js';
import { Score } from '../ui/Score.js';
import { Alien } from '../entity/Alien.js';
import { TexturesLoader } from '../libs/texturesLoader.js';

class RetroGame {
    constructor() {
        this.size = 800;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.graphics = new PIXI.Graphics();
        this.step = 10;
        this.delta = 0;
        this.texturesLoader = new TexturesLoader();
        this.pool = [];
        this.loadGame();
        this.app.ticker.add(() => { this.update(this.app.ticker.deltaMS) });
    }

    loadGame() {
        document.body.appendChild(this.app.view);
        this.loadEntities();
    }

    loadEntities() {
        for (let row = 0; row < 11; row++) {
            //                       game, coord, hp, max_hp, force, speed, sprites, state, scale, rotation, coord_tuple
            this.pool.push(new Alien(this, [row * 50 + 100, 0 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], "alien_0", 3, 0, [row, 0]));
            this.pool.push(new Alien(this, [row * 50 + 100, 1 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], "alien_0", 3, 0, [row, 1]));
            this.pool.push(new Alien(this, [row * 50 + 100, 2 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_1", 3, 0, [row, 2]));
            this.pool.push(new Alien(this, [row * 50 + 100, 3 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], "alien_1", 3, 0, [row, 3]));
            this.pool.push(new Alien(this, [row * 50 + 100, 4 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], "alien_2", 3, 0, [row, 4]));
        }
        // this.pool.push(new Player(this, [400,600], 3, 3, 1, 3, textures.player, 3, "player", 3, 0));

        // Définition des propriétés du rectangle
        const rectWidth = 550;
        const rectHeight = 250;
        const rectColor = 0xFF0000; // Couleur en format hexadécimal

        this.graphics.beginFill(rectColor, 0.5);
        this.graphics.drawRect(this.pool[0].coord[0]-25, this.pool[0].coord[1]-25, rectWidth, rectHeight);
        this.graphics.endFill();

        this.app.stage.addChild(this.graphics);
    }

    alienMove() {
        if (this.delta >= 500) {
            this.delta = 0;
            if (this.graphics.x < -30 || this.graphics.x >= 150) {
                this.step *= -1;
                this.graphics.y += Math.abs(this.step);
                this.graphics.x += this.step/Math.abs(this.step/2);
            } else {
                this.graphics.x += this.step;
            }
        }
    }

    update(delta) {
        this.delta += delta;
        this.alienMove();
        
        for (const entity of this.pool) {
            entity.update(delta);
        }
    }
}

export { RetroGame };