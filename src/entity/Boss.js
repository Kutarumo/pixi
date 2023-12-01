import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";
import { TexturesLoader } from "../libs/texturesLoader.js";

class Boss extends LivingEntity {
    constructor(game, coord, hp, max_hp, force, speed, sprites, state, scale, rotation, coord_tuple) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);
        this.coord_tuple = coord_tuple;
        this.owner = state;
        this.sprite.animationSpeed = 0.01;
        this.sprite.anchor.set(0.5);

        // Play the animation and Add sprite to screen
        this.sprite.play();
        this.addToScreen();
    }

    addToScreen() {
        this.game.graphics.addChild(this.sprite);
    }
    remove(){
        super.remove();
    }
    update() {
        // If alien reaches the left edge of the screen, set its x-coordinate to the right edge
        if (this.coord_tuple[0] - this.sprite.width < 0) {
            this.coord_tuple[0] = this.game.screen.width;
        }
    
        // If alien reaches the right edge of the screen, set its x-coordinate to the left edge
        if (this.coord_tuple[0] + this.sprite.width > this.game.screen.width) {
            this.coord_tuple[0] = 0 - this.sprite.width;
        }
    
        this.update_position();
    }
}

export { Boss };