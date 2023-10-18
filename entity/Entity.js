class Entity {
    constructor(app) {
        this.app = app;
        this.hp = 1;
        this.sprites = [];
        this.coord = []
    }

    SpriteCenterX() {
        return this.sprite.x + (this.sprite.width/2);
    }
    
    SpriteCenterY() {
        return this.sprite.y + (this.sprite.height/2);
    }

    healthManager(hp) {
        this.hp += hp
    }

    update() {}

    destroy() {
        for (const sprite of this.sprites) {
            sprite.destroy();
        }
        
    }
    
    remove() {
        const index = this.pool.indexOf(this);
        if (index !== -1) {
            this.pool.splice(index, 1);
        }
        this.destroy();
        this.app.stage.removeChild(this.sprite);
    }
}

export { Entity };