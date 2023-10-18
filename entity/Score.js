import { Entity } from "./Entity.js";

class Score extends Entity {
    constructor(game, coord) {
        super(game);
        this.coord = coord
        this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 'white',
        });
        this.text = "Score : ";
        this.score = 0;
        this.createText()
    }

    saveScore() {
        const data = {
            name: 'hello le monde',
            value: this.score
        };
          
        fetch('http://localhost:3000/saveData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) 
        .then(result => console.log('Réponse du serveur:', result))
        .catch(error => console.error('Erreur lors de la requête:', error.message));
    }

    getScores() {
        fetch('http://localhost:3000/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) 
        .then(result => console.log('Réponse du serveur:', result.data))
        .catch(error => console.error('Erreur lors de la requête:', error.message));
    }

    createText() {
        this.textObj = new PIXI.Text(this.text + this.score.toString(), this.style);
        this.textObj.x = this.coord[0];
        this.textObj.y = this.coord[1];
        this.game.app.stage.addChild(this.textObj);
        this.game.app.ticker.add(this.update.bind(this));
    }

    increment(a){
        this.score += a 
    }

    update() {
        this.textObj.text = this.text + this.score.toString();
    }
    
}


  

export { Score };
