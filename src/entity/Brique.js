import { LivingEntity } from "../libs/LivingEntity.js";

class Brique extends LivingEntity{
    // game, coord, hp, max_hp, force, speed, sprites, scale, rotation
    constructor(game, coord, width, height) {
        super(game, coord, 1, 1, 0, 0, null, 1, 0)
        this.owner = "wall";
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
        this.sprite.width = width;
        this.sprite.height = height;
    }
}

export { Brique };