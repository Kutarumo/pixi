import { Player } from './entity/Player.js';
import { Bullet } from './entity/Bullet.js';

class MainGame {
    constructor() {
        this.size = 500;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.loadGame()

        this.app.ticker.add(this.update.bind(this));
        
        this.pool.push(new Player(this.app));

    }

    loadGame() {
        document.body.appendChild(this.app.view);
    }

    update() {
        const player = this.pool[0];
        if (player instanceof Player) {
            if (player.hp <= 0) {
                const index = this.pool.indexOf(player);
                if (index !== -1) {
                    this.pool.splice(index, 1);
                }
            }
        }
        this.pool.forEach((bullet, index) => {
            if (bullet instanceof Bullet) {
                if (bullet.sprite.y < 0 || bullet.sprite.y > this.size) {
                    this.pool.splice(index, 1);
                    this.app.stage.removeChild(bullet.sprite);
                }
            }
        });
    }
}

const game = new MainGame();

function gameLoop() {
    game.update();
    requestAnimationFrame(gameLoop);
}
  
gameLoop();