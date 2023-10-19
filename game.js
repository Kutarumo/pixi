import { Entity } from './entity/Entity.js';
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

    checkCollisionsWithBullets() {
        const toleranceRadius = 10;
        const bullets = this.pool.filter(bullet => bullet instanceof Bullet);
        const entities = this.pool.filter(entity => entity instanceof Entity);
        bullets.forEach(bullet => {
            const bulletCoord = bullet.coord;
            const bulletOwner = bullet.owner;
            entities.forEach(entity => {
                const entityX = entity.coord[0];
                const entityY = entity.coord[1];

                if (
                    entityX >= bulletCoord[0] - toleranceRadius &&
                    entityX <= bulletCoord[0] + bulletCoord[2] + toleranceRadius &&
                    entityY >= bulletCoord[1] - toleranceRadius &&
                    entityY <= bulletCoord[1] + bulletCoord[3] + toleranceRadius
                ) {
                    if (
                        entity instanceof Bullet && bulletOwner !== entity.owner ||
                        entity instanceof Player && bulletOwner !== "player" ||
                        entity instanceof Alien && bulletOwner !== "alien"
                    ) {
                        if (entity instanceof Alien) {
                            console.log("alien " + entity.coord_tuple + " a été touché."); 
                        }
                        bullet.remove();
                        entity.remove();
                    }
                }
            });
        });
    }

    update() {
        const bullets = this.pool.filter(entity => entity instanceof Bullet);
        bullets.forEach(bullet => {
            
            if (bullet.coord[1] < 0 || bullet.coord[1] > this.size) {
                bullet.remove();
            }
        });
        this.checkCollisionsWithBullets();
    }
}

export { MainGame };