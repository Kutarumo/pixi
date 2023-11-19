import { Entity } from "./Entity.js"


class LivingEntity extends Entity {
    constructor(game, coord, hp, max_hp, force, speed, sprites, scale, rotation) {
        super(game, coord, sprites, scale, rotation);
        this.max_hp = max_hp;
        this.hp = hp;
        this.force = force;
        this.speed = speed;
    }

    damage(damage) {
        if (this.hp <= 0) {
            this.remove();
            return;
        }
        else {
            this.hp -= damage;
        }
    }
}

export { LivingEntity };