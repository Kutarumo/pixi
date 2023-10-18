import { Alien } from './Alien.js';
import { Player } from './Player.js';
import { Entity } from './Entity.js';

class Bullet extends Entity {

    constructor(app, owner, pool, speed, x, y) {
        super(app);
        this.owner = owner;
        this.pool = pool;
        this.coord = [x, y];
        this.sprite = null;
        this.speed = speed;

        this.loader = new PIXI.Loader();

        this.loader.add('ball', './entity/assets/ball.png').load((loader, resources) => {
            if (resources.ball) {
                this.createSprite(resources.ball.texture);
                this.app.ticker.add(this.update.bind(this));
            } else {
                console.error("L'image 'ball' n'a pas été chargée correctement.");
            }
        });
        
    }

    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.02, 0.02);
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
        this.app.stage.addChild(this.sprite)
    }

    shootToPlayer(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }
    
    checkCollisionsWithBullets(list) {
        const toleranceRadius = 10;
        const entities = this.pool.filter(entity => entity instanceof Entity)
        entities.forEach(entity => {
            const entityX = entity.coord[0];
            const entityY = entity.coord[1];
            if (
                entityX >= this.SpriteCenterX() - toleranceRadius &&
                entityX <= this.SpriteCenterX() + toleranceRadius &&
                entityY >= this.SpriteCenterY() - toleranceRadius &&
                entityY <= this.SpriteCenterY() + toleranceRadius
            ) {
                if (this.owner == "player" && entity.constructor.name instanceof Player) return;
                if (this.owner == "alien" && entity.constructor.name instanceof Alien) return;
                console.log("collision entre " + this.constructor.name + " et " + entity.constructor.name)
                this.remove()
                entity.remove();
            }
        });
    }

    update() {
        this.sprite.y -= this.speed;
        this.checkCollisionsWithBullets();
    }
}

export { Bullet };