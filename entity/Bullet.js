import { Alien } from './Alien.js';
import { Player } from './Player.js';
import { Entity } from './Entity.js';

class Bullet extends Entity {

    constructor(game, owner, speed, coord) {
        super(game);
        this.owner = owner;
        this.coord = coord;
        this.sprite = null;
        this.speed = speed;

        this.loader = new PIXI.Loader();

        this.loader.add('ball', './entity/assets/ball.png').load((loader, resources) => {
            if (resources.ball) {
                this.createSprite(resources.ball.texture);
                this.game.app.ticker.add(this.update.bind(this));
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
        this.game.app.stage.addChild(this.sprite)
    }
    
    checkCollisionsWithBullets() {
        const toleranceRadius = 10;
        const entities = this.game.pool.filter(entity => entity instanceof Entity);
        let collisionDetected = false;
        entities.forEach(entity => {
            if (collisionDetected) return;
            const entityX = entity.coord[0];
            const entityY = entity.coord[1];
            if (
                entityX >= this.sprite.x - toleranceRadius &&
                entityX <= this.sprite.x + this.sprite.width + toleranceRadius &&
                entityY >= this.sprite.y - toleranceRadius &&
                entityY <= this.sprite.y + this.sprite.height + toleranceRadius
            ) {
                if (this.owner == "player" && entity instanceof Player) {
                    console.log("collision non prise en compte.");
                } 
                else if (this.owner == "alien" && entity instanceof Alien) {
                    console.log("collision non prise en compte.");
                } 
                else if (this.owner == "alien" && entity instanceof Bullet && entity.owner == "alien") {
                    console.log("collision non prise en compte.");
                } 
                else if (this.owner == "player" && entity instanceof Bullet && entity.owner == "player") {
                    console.log("collision non prise en compte.");
                } 
                else {
                    console.log("collision entre " + this.constructor.name + " et " + entity.constructor.name + ", bullet tiré par " + this.owner + ".")
                    this.remove();
                    entity.remove();
                    collisionDetected = true;
                }
            }
        });
    }

    update() {
        this.sprite.y -= this.speed;
        this.checkCollisionsWithBullets();
        this.coord = [this.SpriteCenterX(), this.SpriteCenterY()];
    }
}

export { Bullet };