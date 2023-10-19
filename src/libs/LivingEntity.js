import { Entity } from "./Entity.js"


class LivingEntity extends Entity {
    constructor(game, textures, coord, scale, rotation, max_hp, hp, force) {
        super(game, textures, coord, scale, rotation);
        this.max_hp = max_hp;
        this.hp = hp;
        this.force = force;
    }

    damage(damage) {
        if (this.hp <= 0) {
            this.remove();
        }
        else {
            this.hp -= damage;
        }
    }
}

export { LivingEntity };