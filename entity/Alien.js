import { Entity } from "./Entity.js";
import { Bullet } from './Bullet.js';

class Alien extends Entity {

    constructor(game,  list) {
        super(game);
        this.coord_tuple = list;
        this.loader = new PIXI.Loader();
    
        this.loader.add('sprite_alien', './entity/assets/sprite_player.png').load((loader, resources) => {
            if (resources.sprite_alien) {
                this.createSprite(resources.sprite_alien.texture);
                this.game.app.ticker.add(this.update.bind(this));
            } else {
                console.error("L'image 'sprite_alien' n'a pas été chargée correctement.");
            }
        });
    }

    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.rotation = Math.PI;
        this.sprite.scale.set(0.1, 0.1);
        this.game.app.stage.addChild(this.sprite);
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
        const aliens = this.game.pool.filter(entity => entity instanceof Alien);
        const hasElementWithCoordPlusOne = aliens.some(alien => alien.coord_tuple[0] === this.coord_tuple[0] + 1);
        if (!hasElementWithCoordPlusOne) {
            if (this.generateRandomBoolean(0.05)) {
                this.bullet = new Bullet(
                    this.game,
                    "alien",
                    -2, 
                    this.coord
                );
                this.game.pool.push(this.bullet);
            }
        }
        
        this.coord = [this.SpriteCenterX(), this.SpriteCenterY()];
    }
}

export { Alien };