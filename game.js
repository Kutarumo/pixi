import { Player } from './entity/Player.js';
import { Bullet } from './entity/Bullet.js';
import { Score } from './entity/Score.js';
import { Alien } from './entity/Alien.js';

class MainGame {
    constructor() {
        this.size = 500;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.loadGame()

        this.engine = Matter.Engine.create();
        this.setupPhysics();

        this.pool.push(new Score(this.app, this.pool, 0, 0));
        
        this.pool.push(new Player(this.app, this.pool));
        const playerBody = Matter.Bodies.rectangle(
            this.pool[1].sprite.x,
            this.pool[1].sprite.y,
            this.pool[1].sprite.width,
            this.pool[1].sprite.height
        );
        this.pool[1].matterBody = playerBody;
    
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
        // Créez un corps Matter.js pour chaque alien et associez-les aux entités Pixi.js.
        for (const row of this.pool[2]) {
            for (const alien of row) {
                const alienBody = Matter.Bodies.rectangle(
                    alien.sprite.x,
                    alien.sprite.y,
                    alien.sprite.width,
                    alien.sprite.height
                );
                alien.matterBody = alienBody;
            }
        }
        // Ajoutez les corps Matter.js au moteur Matter.js.
        Matter.World.add(this.engine.world, this.pool[1].matterBody);
        for (const row of this.pool[2]) {
            for (const alien of row) {
                Matter.World.add(this.engine.world, alien.matterBody);
            }
        }
        this.app.ticker.add(this.update.bind(this));
    }

    loadGame() {
        document.body.appendChild(this.app.view);
    }

    setupPhysics() {}
    
    createMatterBody(obj) {
        // Créez un corps Matter.js pour un objet Pixi.js
        const { x, y, width, height } = obj;
        const body = Matter.Bodies.rectangle(x, y, width, height);

        // Associez l'objet Pixi.js au corps Matter.js
        obj.matterBody = body;

        // Ajoutez le corps Matter.js au moteur
        Matter.World.add(this.engine.world, body);
    }

    update() {
        Matter.Engine.update(this.engine);
    }
}

const game = new MainGame();

function gameLoop() {
    game.update();
    requestAnimationFrame(gameLoop);
}
  
gameLoop();