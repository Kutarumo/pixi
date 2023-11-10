import { Entity } from "../libs/Entity.js";
import { LivingEntity } from "../libs/LivingEntity.js";
import { Alien } from "./Alien.js";
import { Player } from "./Player.js";

class Bullet extends LivingEntity {

    constructor(game, textures, coord, scale, rotation, max_hp, hp, force, faction, speed) {
        super(game, textures, coord, rotation, scale, max_hp, hp, force);
        this.attributeSprite();
        this.faction = faction;
        this.coord = coord;
        this.speed = speed;
        this.addToScreen();
    }

    attributeSprite() {
        if (this.faction = "player") {
            this.sprite.texture = this.sprites.bullet.texture;
        } else {
            this.sprite.texture = this.sprites.bullet_1.texture;
        }
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
    
    update() {
        if (this.hp <= 0 || this.coord[1] < 0 || this.coord[1] > this.game.size) {
            this.remove();
            return;
        }
        const entities = this.game.pool.filter(entity => entity instanceof Entity);
        for (const entity of entities) {
            if 
            (
                this.overlapsWith(entity)  &&
                this.faction !== entity.faction
            ) {
                console.log("collision");
                this.damage(1);
                entity.damage(1);
                return;
            }
        }
            
        this.coord[1] -= this.speed;
        this.update_position();
    }
}

export { Bullet };