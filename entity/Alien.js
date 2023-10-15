import { Entity } from "./Entity.js";
import { Bullet } from './Bullet.js';

class Alien extends Entity {

    constructor(app, pool, list) {
        super(app);
        this.app = app;
        this.pool = pool;
        this.coord_tuple = [list[0], list[1]];
        this.loader = new PIXI.Loader();
    
        this.loader.add('sprite_alien', './entity/assets/sprite_player.png').load((loader, resources) => {
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
        this.sprite.anchor.set(0.5);
        this.sprite.rotation = Math.PI;
        this.createCollision();
        this.sprite.scale.set(0.1, 0.1);
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
    
    areArraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    update() {
        if (this.hp <= 0) {
            this.destroy();
            return;
        }
        if (
            !this.pool[2] ||
            !this.pool[2][this.coord_tuple[0] + 1] ||
            this.pool[2][this.coord_tuple[0] + 1][this.coord_tuple[1]] === undefined
        ) {
            if (this.generateRandomBoolean(0.2)) {
                this.bullet = new Bullet(this.app, -2, this.SpriteCenterX(), this.SpriteCenterY());
                this.pool.push(this.bullet);
            }
        }
    }
}

export { Alien };