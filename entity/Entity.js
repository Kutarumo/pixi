class Entity {
    constructor(game) {
        this.game = game;
        this.hp = 1;
        this.sprites = [];
        this.coord = [];
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
        console.log(this.game.pool)
        const index = this.game.pool.indexOf(this);
        if (index !== -1) {
            this.game.pool.splice(index, 1);
        }
        this.destroy();
        this.game.app.stage.removeChild(this.sprite);
        console.log(this.game.pool)
    }
}

export { Entity };