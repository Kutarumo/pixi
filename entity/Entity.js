class Entity {
    constructor(app) {
        this.app = app;
        this.hp = 1;
        this.sprites = [];
    }

    SpriteCenterX() {
        return this.sprite.x + (this.sprite.width/2);
    }
    
    SpriteCenterY() {
        return this.sprite.y + (this.sprite.height/2);
    }

    update() {}

    destroy() {
        for (const sprite of this.sprites) {
            sprite.destroy();
        }
    }
}

export { Entity };