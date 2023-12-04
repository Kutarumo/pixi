import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";
import { TexturesLoader } from "../libs/texturesLoader.js";

class Alien extends LivingEntity {
    constructor(game, coord, hp, max_hp, force, speed, sprites, state, scale, rotation, coord_tuple) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);
        this.coord_tuple = coord_tuple;
        this.owner = state;
        this.sprite.animationSpeed = 0.01;
        this.sprite.anchor.set(0.5);
        this.delta = 0;

        // Play the animation and Add sprite to screen
        this.sprite.play();
        this.addToScreen();
    }

    onDeath() {
        this.game.score += 10;
        console.log(this.game.score)
    }

    update(delta) {
        this.delta += delta;
        const alien = this.game.pool.filter(alien => alien instanceof Alien).some(alien => this.coord_tuple[0] === alien.coord_tuple[0] && this.coord_tuple[1]+1 === alien.coord_tuple[1]);
        if (!alien) {
            if (generateRandomBoolean(0.05)) {
                this.game.addPoolEntity(new Bullet(this.game, [...this.coord], 1, 1, 1, -3, this.game.texturesLoader.textures[2][0], 3, 0, this.owner));
            }
        }
        this.update_position();
    }
}

export { Alien };