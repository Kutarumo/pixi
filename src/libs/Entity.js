import { extractFileName } from './Utils.js';

class Entity {
    constructor(game, coord) {
        this.game = game;
        this.coord = coord;
        this.sprite = new PIXI.Sprite();
    }

    addToScreen() {
        this.game.app.stage.addChild(this.sprite);
    }

    getPoolEntity() {

    }

    addPoolEntity(entity_to_add) {
        this.game.pool.push(entity_to_add);
    }

    removePoolEntity(entity) {
        const index = this.game.pool.indexOf(entity);
        if (index !== -1) {
            this.game.pool.splice(index, 1);
        }
    }

    remove() {
        this.game.app.stage.removeChild(this.sprite);
        this.removePoolEntity(this);
        this.sprites = {};
    }

    update_position() {
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
    }

    update() {}
}

export { Entity };