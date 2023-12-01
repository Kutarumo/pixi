class Brique {
    constructor(x, y, width, height) {
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = width;
        this.sprite.height = height;
    }
}

export { Brique };