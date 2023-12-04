import { Entity } from "./Entity.js"


class LivingEntity extends Entity {
    constructor(game, coord, hp, max_hp, force, speed, sprites, scale, rotation) {
        super(game, coord, sprites, scale, rotation);
        this.max_hp = max_hp;
        this.hp = hp;
        this.force = force;
        this.speed = speed;
    }

    onDeath() {

    }

    damage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.onDeath();
            this.remove();
            return;
        }
    }
}

export { LivingEntity };