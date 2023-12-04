import { extractFileName } from './Utils.js';

class Entity {
    constructor(game, coord, sprites, scale, rotation) {
        this.game = game;
        this.coord = coord;
        if (sprites) {
            this.sprite = new PIXI.AnimatedSprite(sprites);
            this.sprite.scale.set(scale);
            this.sprite.rotation = rotation;
        }
    }

    addToScreen() {
        this.game.app.stage.addChild(this.sprite);
    }

    getPoolEntity() {

    }

    remove() {
        this.game.app.stage.removeChild(this.sprite);
        this.game.removePoolEntity(this);
        this.sprite.destroy();
    }

    update_position() {
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
    }

    update() {
        this.update_position();
    }
}

export { Entity };