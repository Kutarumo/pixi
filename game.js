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
        this.pool.push(new Alien(this.app, this.pool));
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
                    this.app.stage.removeChild(bullet.sprite);
                    return false; // Ne pas conserver l'élément
                }
            }
            return true; // Conserver l'élément
        });
    }
}

const game = new MainGame();

function gameLoop() {
    game.update();
    requestAnimationFrame(gameLoop);
}
  
gameLoop();