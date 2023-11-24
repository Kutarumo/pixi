import { Base } from "./base.js";


class TestGame extends Base{
    constructor(size) {
        super(size)
        this.wall = new PIXI.Graphics();
        this.wall_params();
        this.load_app();
        

        this.app.ticker.add(() => { this.update(this.app.ticker.deltaMS) });
    }

    wall_params() {
        this.wall.beginFill(0xFF0000, 0.5);
        this.wall.drawRect(0, 0, this.size/8, this.size/8);
        this.wall.endFill();

        this.textures = PIXI.Texture.WHITE;
        this.wall_sprite


        this.app.stage.addChild(this.wall);
    }

    update(delta) {
        super.update();
    }   
}

export { TestGame };