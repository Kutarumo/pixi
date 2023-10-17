import { Entity } from './Entity.js';

class Bullet extends Entity {

    constructor(app, pool, speed, x, y) {
        super(app);
        this.pool = pool;
        this.coord = [x, y]
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

    getCoord() {
        return [this.sprite.x, this.sprite.y]
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

    update() {
        if (this.hp <= 0 || this.sprite.y < 0) {
            this.remove();
            return;
        }
        this.sprite.y -= this.speed;
    }

    remove() {
        const index = this.pool.indexOf(this);
        this.pool.splice(index, 1);
        this.destroy();
    }
}

export { Bullet };