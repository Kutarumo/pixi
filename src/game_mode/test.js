import { Wall } from "../entity/Wall.js";
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
        this.wall = new Wall(this, [0, 0]);
    }

    update(delta) {
        super.update();
    }   
}

export { TestGame };