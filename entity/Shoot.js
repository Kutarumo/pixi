import { PoolEntities } from './PoolEntities.js';

class Shoot {

    constructor(app, x, y) {
        this.app = app;
        this.coord = [x, y]
        this.sprite = null;
        this.speed = 2;

        this.loader = new PIXI.Loader();

        this.loader.add('ball', './ball.png').load((loader, resources) => {
            console.log(resources);

            if (resources.ball) {
                this.createSprite(resources.ball.texture);
                this.addToStage();
                this.app.ticker.add(this.update.bind(this));
            } else {
                console.error("L'image 'ball' n'a pas été chargée correctement.");
            }
        });
    }

    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.05, 0.05);
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
    }

    addToStage() {
        this.app.stage.addChild(this.sprite)
    }

    shootToPlayer(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    update() {
        this.sprite.y -= this.speed;
    }
}

export { Shoot };