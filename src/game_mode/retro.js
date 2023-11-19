import { Player } from '../entity/Player.js';
import { Score } from '../ui/Score.js';
import { Alien } from '../entity/Alien.js';
import { TexturesLoader } from '../libs/texturesLoader.js';

class RetroGame {
    constructor() {
        this.size = 800;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
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
            this.pool.push(new Alien(this, [row * 50 + 100, 0 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], 1000, "alien", 4, 0, [row, 0], true));
            this.pool.push(new Alien(this, [row * 50 + 100, 1 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][0], 1000, "alien", 4, 0, [row, 1], true));
            this.pool.push(new Alien(this, [row * 50 + 100, 2 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], 1000, "alien", 4, 0, [row, 2], true));
            this.pool.push(new Alien(this, [row * 50 + 100, 3 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][1], 1000, "alien", 4, 0, [row, 3], true));
            this.pool.push(new Alien(this, [row * 50 + 100, 4 * 50 + 100], 1, 1, 1, 0, this.texturesLoader.textures[0][2], 1000, "alien", 4, 0, [row, 4], true));
        }
        // this.pool.push(new Player(this, [400,600], 3, 3, 1, 3, textures.player, 3, "player", 3, 0));
    }

    update(delta) {
        for (const entity of this.pool) {
            entity.update(delta);
        }
    }
}

export { RetroGame };