import { Entity } from "./Entity";

class Alien extends Entity {

    constructor(app) {
        super(app)
    }
    update() {
        if (this.hp <= 0) {
            this.destroy();
            return;
        }
    }
}

export { Alien };