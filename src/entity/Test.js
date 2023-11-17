import { textures } from '../libs/texturesLoader.js';

class Test {

    constructor(game) {
        this.game = game;

        this.sprite = new PIXI.Sprite();
        this.sprite.texture = textures.player.player_1;
        this.sprite.x = 200;
        this.sprite.y = 200;

        this.game.app.stage.addChild(this.sprite);
    }
}

export { Test };