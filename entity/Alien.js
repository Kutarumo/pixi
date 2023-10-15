import { Entity } from "./Entity.js";
import { Bullet } from './Bullet.js';

class Alien extends Entity {

    constructor(app, pool) {
        super(app);
        this.app = app;
        this.pool = pool;
        this.loader = new PIXI.Loader();
    
        this.loader.add('sprite_alien', './entity/assets/sprite_player.png').load((loader, resources) => {
            console.log(resources);
            if (resources.sprite_alien) {
                this.createSprite(resources.sprite_alien.texture);                
                this.app.ticker.add(this.update.bind(this));
            } else {
                console.error("L'image 'sprite_alien' n'a pas été chargée correctement.");
            }
        });
    }

    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = 250;
        this.sprite.y = 350;
        this.sprite.anchor.set(0.5);
        this.sprite.rotation = Math.PI;
        this.createCollision();
        this.sprite.scale.set(0.3, 0.3);
        this.app.stage.addChild(this.sprite);
    }

    createCollision() {
        this.boundingBox = new PIXI.Graphics();
        this.boundingBox.beginFill(0x000000, 0);
        this.boundingBox.lineStyle(1, 0xFF0000);
        this.boundingBox.drawRect(0, 0, this.sprite.width, this.sprite.height);
        this.boundingBox.endFill();
        this.sprite.addChild(this.boundingBox);
    }

    getRandom() {
        return Math.random();
    }
  
    generateRandomBoolean(chancePercentage) {
    if (chancePercentage < 0 || chancePercentage > 100) {
        throw new Error("Le pourcentage de chance doit être compris entre 0 et 100.");
    }
    const randomValue = this.getRandom() * 100;
        return randomValue < chancePercentage;
    }
  

    update() {
        if (this.hp <= 0) {
            this.destroy();
            return;
        }
        if (this.generateRandomBoolean(1)){
            this.bullet = new Bullet(this.app, -2);
            this.pool.push(this.bullet);
        }
    }
}

export { Alien };