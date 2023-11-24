import { Score } from "./Score.js";

class GameMenu {
    constructor(game, size) {
        this.game = game;
        this.size = size;
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF0000, 0.5);
        this.graphics.drawRect(0, 0, this.size, this.size);
        this.graphics.endFill();

        this.game.app.stage.addChild(this.graphics);
        this.addScore();
    }

    addScore() {
        this.score = new Score(this.game, [0,0]);
        this.score.addToScreen();
    }
    update() {
        this.score.update();
    }
}

export { GameMenu };