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

        this.pool.push(new Score(this.app, this.pool, 0, 0));        
        this.pool.push(new Player(this.app, this.pool));

        const aliens = [];

        for (let row = 0; row < 5; row++) {
            const alienRow = [];
            for (let col = 0; col < 11; col++) {
                const alien = new Alien(this.app, this.pool, [row, col]);
                alien.loader.onComplete.add(() => {
                    const alienWidth = alien.sprite.width;
                    const alienHeight = alien.sprite.height;

                    alien.sprite.x = col * (alienWidth) + 50;
                    alien.sprite.y = row * (alienHeight) + 50;

                    alienRow.push(alien);
                });
            }
            aliens.push(alienRow);
        }

        this.pool.push(aliens);
        this.app.ticker.add(this.update.bind(this));
    }

    loadGame() {
        document.body.appendChild(this.app.view);
    }

    update() {
        const player = this.pool[1];
        if (player instanceof Player && player.hp <= 0 ) {
            player.remove();
        }
        const bullets = this.pool.filter((entity) => entity instanceof Bullet);
        bullets.forEach(function(bullet) {
            if (bullet instanceof Bullet && bullet.hp <= 0 ) {
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