import { Player } from '../entity/Player.js';
import { Score } from '../ui/Score.js';
import { Alien } from '../entity/Alien.js';
import { textures } from '../libs/texturesLoader.js';

class RetroGame {
    constructor() {
        this.size = 800;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.loadGame();

        for (let row = 0; row < 11; row++) {
            this.pool.push(new Alien(this, textures.alien_1, [row * 50 + 100, 0 * 50 + 100], 3, undefined, 1, 1, [0, 0]));
            this.pool.push(new Alien(this, textures.alien_2, [row * 50 + 100, 1 * 50 + 100], 3, undefined, 1, 1, [0, 1]));
            this.pool.push(new Alien(this, textures.alien_2, [row * 50 + 100, 2 * 50 + 100], 3, undefined, 1, 1, [0, 2]));
            this.pool.push(new Alien(this, textures.alien_3, [row * 50 + 100, 3 * 50 + 100], 3, undefined, 1, 1, [0, 3]));
            this.pool.push(new Alien(this, textures.alien_3, [row * 50 + 100, 4 * 50 + 100], 3, undefined, 1, 1, [0, 4]));
        }
        this.pool.push(new Player(this, textures.player, [250, 550], 3, undefined, 3, 3));
        // this.pool.push(new Alien(this, textures.alien_3, [0 * 50 + 100, 4 * 50 + 100], 3, undefined, 3, 3, [0, 4]));
        
        
        this.app.ticker.add(this.update());
    }

    loadGame() {
        document.body.appendChild(this.app.view);
    }

    update() {
    }
}

export { RetroGame };