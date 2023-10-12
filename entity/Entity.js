class Entity {
    constructor(app) {
        this.app = app
        this.hp = 1;
        this.sprites = [];
    }

    update() {}

    destroy() {
        for (const sprite of this.sprites) {
            sprite.destroy();
        }
    }
}

export { Entity };