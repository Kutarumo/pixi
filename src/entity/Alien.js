import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";

class Alien extends LivingEntity {

    constructor(game, textures, coord, scale, rotation, max_hp, hp, positions) {
        super(game, textures, coord, scale, rotation, max_hp, hp);
        this.coord_tuple = positions;
        this.sprite.texture = this.sprites.alien_1.texture;
        this.addToScreen();
        this.currentFrame = 1;
        this.delta = 0;
        this.speed = 100;
        this.game.app.ticker.add((delta) => {
            if (this.delta < this.speed) this.delta += delta;
            else {
                this.delta = 0;
                this.currentFrame = (this.currentFrame % 2) + 1;
                this.changeSprite("alien_"+this.currentFrame);
                // this.coord[0] += 10;
            }
        }, this);
    }

    update() {
        if (this.hp <= 0) {
            this.remove();
        }
        this.update_position();
    }
}

export { Alien };