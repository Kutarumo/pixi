import { Player } from './entity/Player.js';
import { Bullet } from './entity/Bullet.js';
import { Score } from './entity/Score.js'; // Assurez-vous de fournir le bon chemin d'accès au fichier
import { Alien } from './entity/Alien.js';

class MainGame {
    constructor() {
        this.size = 500;
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
        this.pool[0].saveScore();
        this.pool[0].getScores();
        this.app.ticker.add(this.update.bind(this));
    }

    loadGame() {
        document.body.appendChild(this.app.view);
    }

    update() {
        this.pool[0].increment(10);
        const player = this.pool[1];
        if (player instanceof Player) {
            if (player.hp <= 0) {
                const index = this.pool.indexOf(player);
                if (index !== -1) {
                    this.pool.splice(index, 1);
                }
            }
        }
        this.pool = this.pool.filter((bullet) => {
            if (bullet instanceof Bullet) {
                if (bullet.sprite.y < 0 || bullet.sprite.y > this.size) {
                    return false; // Ne pas conserver l'élément
                }
            }
            return true; // Conserver l'élément
        });
        console.log(this.pool);
    }
    
}

const game = new MainGame();

function gameLoop() {
    game.update();
    requestAnimationFrame(gameLoop);
}
  
gameLoop();