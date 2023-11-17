import { Entity } from "./Entity.js"


class LivingEntity extends Entity {
    constructor(game, coord, hp, max_hp, force, speed) {
        super(game, coord);
        this.max_hp = max_hp;
        this.hp = hp;
        this.force = force;
        this.speed = speed;
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