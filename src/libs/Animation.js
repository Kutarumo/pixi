import { LivingEntity } from "../libs/LivingEntity.js";

class Animation extends LivingEntity{
    constructor(game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, repeat = false) {
        super(game, coord, hp, max_hp, force, speed)
        this.game = game;
        this.sprites = sprites;
        this.animation_rate = animation_rate;
        this.state = state;
        this.repeat = repeat;
        this.sprite.scale.x = scale;
        this.sprite.scale.y = scale;
        this.sprite.rotation = (rotation * Math.PI) / 180;
        this.sprite.texture = this.sprites[state+"_1"];
        this.loader = new PIXI.Loader();

        this.addToScreen();
    }

    changeSprite(sprite) {
        this.sprite.texture = this.sprites[sprite];
    }
}

export { Animation };