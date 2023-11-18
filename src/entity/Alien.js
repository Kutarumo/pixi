import { Animation } from "../libs/Animation.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";
import { textures } from "../libs/texturesLoader.js";

class Alien extends Animation {

    constructor(game, textures, coord, scale, rotation, max_hp, hp, positions, state, nbTexture) {
        super(game, textures, coord, scale, rotation, max_hp, hp, state, nbTexture);
        this.coord_tuple = positions;
        this.currentFrame = 1;
        this.delta = 0;
        this.speed = 1000;
        this.owner = "alien";
    }

    update() {
        if (this.hp <= 0) {
            this.remove();
            return;
        }
        // const alien = this.game.pool.filter(alien => alien instanceof Alien).some(alien => this.coord_tuple[0] === alien.coord_tuple[0] && this.coord_tuple[1]+1 === alien.coord_tuple[1]);
        /* if (!alien) {
            if (generateRandomBoolean(0.5)) {
                this.addPoolEntity(new Bullet(this.game, textures.bullet_1, [...this.coord], undefined, 5, 1, 1, 1, this.faction, -3));
            }
        } */
        this.animation();
        this.update_position();
    }
}

export { Alien };