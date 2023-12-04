class StartGame {
    constructor(game, coord) {
        this.game = game;
        this.coord = coord
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });
        this.text = "Start Game";
        this.textObj = new PIXI.Text(this.text, this.style);
        this.textObj.x = this.coord[0];
        this.textObj.y = this.coord[1];
    }

    addToScreen() {
        this.game.app.stage.addChild(this.textObj);
    }
}

export { StartGame };
