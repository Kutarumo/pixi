class Score {
    constructor(game, coord) {
        this.game = game;
        this.coord = coord
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });
        this.text = "Score : ";
        this.score = 0;
        this.createText();
    }

    createText() {
        this.textObj = new PIXI.Text(this.text + this.score.toString(), this.style);
        this.textObj.x = this.coord[0];
        this.textObj.y = this.coord[1];
    }

    addToScreen() {
        this.game.menu.graphics.addChild(this.textObj);
    }

    increment(a){
        this.score += a 
    }

    update() {
        this.textObj.text = this.text + this.score.toString();
    }
    
}


  

export { Score };
