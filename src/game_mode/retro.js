import { Player } from '../entity/Player.js';
import { Test } from '../entity/Test.js';
import { Score } from '../ui/Score.js';
import { Alien } from '../entity/Alien.js';
import { textures } from '../libs/texturesLoader.js';

class RetroGame {
    constructor() {
        this.size = 800;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.loadGame();

        //this.pool.push(new Alien(this, textures.alien_1, [5 * 50 + 100, 0 * 50 + 100], 3, undefined, 1, 1, [5, 0], "alien", 2));
        // game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, repeat = false
        this.pool.push(new Player(this, [200,200], 3, 3, 1, 3, textures["player"], 3, "player", 2, 0));
        console.log(this.pool);

        //this.pool.push(new Test(this));
        
        // this.app.ticker.add(() => { this.update(this.app.ticker.deltaMS) });
    }

    loadGame() {
        document.body.appendChild(this.app.view);
        // this.loadEntities();
    }

    loadEntities() {
        for (let row = 0; row < 11; row++) {
            this.pool.push(new Alien(this, textures.alien_1, [row * 50 + 100, 0 * 50 + 100], 3, undefined, 1, 1, [row, 0], "alien", 2));
            this.pool.push(new Alien(this, textures.alien_2, [row * 50 + 100, 1 * 50 + 100], 3, undefined, 1, 1, [row, 1], "alien", 2));
            this.pool.push(new Alien(this, textures.alien_2, [row * 50 + 100, 2 * 50 + 100], 3, undefined, 1, 1, [row, 2], "alien", 2));
            this.pool.push(new Alien(this, textures.alien_3, [row * 50 + 100, 3 * 50 + 100], 3, undefined, 1, 1, [row, 3], "alien", 2));
            this.pool.push(new Alien(this, textures.alien_3, [row * 50 + 100, 4 * 50 + 100], 3, undefined, 1, 1, [row, 4], "alien", 2));
        }
        this.pool.push(new Player(this, textures.player, [250, 550], 3, undefined, 3, 3, "player", 1));
    }

    update(delta) {
        for (const entity of this.pool) {
            entity.update(delta);
        }
    }
}

export { RetroGame };