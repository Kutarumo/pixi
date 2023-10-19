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

    update() {
        this.sprite.y -= this.speed;
        this.coord = [this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height];
    }
}

export { Bullet };