class Entity {
    constructor(app) {
        this.app = app;
        this.sprite = null;
    }
    
    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
    }
    
    addToStage() {
        if (this.sprite) {
            this.app.stage.addChild(this.sprite);
        }
    }
}

export { Entity };