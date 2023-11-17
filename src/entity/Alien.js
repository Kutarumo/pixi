import { LivingEntity } from "../libs/LivingEntity.js";
import { Bullet } from './Bullet.js';
import { generateRandomBoolean } from "../libs/Utils.js";
import { textures } from "../libs/texturesLoader.js";

class Alien extends LivingEntity {

    constructor(game, textures, coord, scale, rotation, max_hp, hp, positions) {
        super(game, textures, coord, scale, rotation, max_hp, hp);
        this.coord_tuple = positions;
        this.sprite.texture = this.sprites.alien_1.texture;
        this.addToScreen();
        this.currentFrame = 1;
        this.delta = 0;
        this.speed = 1000;
        this.faction = "alien";
    }

    update(delta) {
        if (this.hp <= 0) {
            this.remove();
            return;
        }
        if (this.delta < this.speed) {
            this.delta += delta;
        } else {
            this.delta = 0;
            this.currentFrame = (this.currentFrame % 2) + 1;
            this.changeSprite("alien_" + this.currentFrame);
            // this.coord[0] += 10;
        }
        const alien = this.game.pool.filter(alien => alien instanceof Alien).some(alien => this.coord_tuple[0] === alien.coord_tuple[0] && this.coord_tuple[1]+1 === alien.coord_tuple[1]);

        if (!alien) {
            if (generateRandomBoolean(0.5)) {
                this.addPoolEntity(new Bullet(this.game, textures.bullet_1, [...this.coord], undefined, 5, 1, 1, 1, this.faction, -3));
            }
        }
        this.update_position();
    }
}

export { Alien };