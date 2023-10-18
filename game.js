import { Player } from './entity/Player.js';
import { Score } from './entity/Score.js';
import { Alien } from './entity/Alien.js';
import { Bullet } from './entity/Bullet.js';

class MainGame {
    constructor() {
        this.size = 600;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.loadGame()

        this.pool.push(new Score(this, [0, 0]));        
        this.pool.push(new Player(this));

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 11; col++) {
                const alien = new Alien(this, [row, col]);
                alien.loader.onComplete.add(() => {
                    const alienWidth = alien.sprite.width;
                    const alienHeight = alien.sprite.height;

                    alien.sprite.x = col * (alienWidth) + 50;
                    alien.sprite.y = row * (alienHeight) + 50;

                    this.pool.push(alien);
                });
            }
        }

        this.app.ticker.add(this.update.bind(this));
    }

    loadGame() {
        document.body.appendChild(this.app.view);
    }

    update() {
        console.log(this.pool.length)
        const player = this.pool.filter(entity => entity instanceof Player);
        if (player && player.hp <= 0) {
            player.remove();
        }
        const bullets = this.pool.filter(entity => entity instanceof Bullet);
        bullets.forEach(bullet => {
            if (bullet.coord[1] < 0 || bullet.coord[1] > this.size) {
                bullet.remove();
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