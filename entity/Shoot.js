import { Entity } from './Entity.js';

class Shoot extends Entity {

    constructor(app, myPlayer) {
        super(app);
        this.app = app;
        this.player = myPlayer.player;
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
        this.sprite.x = this.player[0];
        this.sprite.y = this.player[1];
    }

    addToStage() {
        this.app.stage.addChild(this.sprite);
    }

    update() {
        console.log(this.player)
        this.sprite.y -= this.speed;
        if (this.sprite.y < -this.sprite.height) {
            this.destroy();
        }
    }

    destroy() {
        this.app.stage.removeChild(this.sprite);
        super.destroy(); // Appelez la méthode de la classe parent pour effectuer des opérations supplémentaires si nécessaire
    }
}

export { Shoot };