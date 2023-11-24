import { LivingEntity } from "../libs/LivingEntity.js";
import { Entity } from "../libs/Entity.js";
import { Alien } from "./Alien.js";
import { Player } from "./Player.js";

class Bullet extends LivingEntity {
    // game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, repeat = false
    constructor(game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, owner, repeat) {
        super(game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, repeat);
        this.owner = owner;
    }

    overlapsWith(otherEntity) {
        const x1 = this.coord[0];
        const y1 = this.coord[1];
        const width1 = this.sprite.width;
        const height1 = this.sprite.height;
    
        const x2 = otherEntity.sprite.x;
        const y2 = otherEntity.sprite.y;
        const width2 = otherEntity.sprite.width;
        const height2 = otherEntity.sprite.height;
    
        const overlapX = x1 < x2 + width2 && x1 + width1 > x2;
        const overlapY = y1 < y2 + height2 && y1 + height1 > y2;
    
        const overlap = overlapX && overlapY;
    
        return overlap;
    }
    
    update(delta) {
        this.delta = delta;
        if (this.hp <= 0 || this.coord[1] < 0 || this.coord[1] > this.game.size) {
            this.remove();
            return;
        }
        const entities = this.game.pool.filter(entity => entity instanceof Entity);
        for (const entity of entities) {
            if 
            (
                this.overlapsWith(entity) &&
                this.owner !== entity.owner
            ) {
                if (entity instanceof Player) {
                    entity.isHit = true;
                }
                this.damage(1);
                return;
            }
        }
            
        this.coord[1] -= this.speed;
        this.update_position();
    }
}

export { Bullet };