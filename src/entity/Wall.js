import { Brique } from './Brique.js';

class Wall {
    constructor(game, coord) {
        this.game = game;
        this.coord = coord;
        this.wall_bool = [
            [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        ]
        this.wall = new PIXI.Graphics();
        this.wall.beginFill(0xFF0000, 0.5);
        this.wall.drawRect(0,0,250,200);
        this.wall.endFill();
        this.create_wall();
        this.addToScreen();
    }

    addToScreen() {
        this.game.app.stage.addChild(this.wall);
    }

    create_wall() {
        const width = this.wall.width / this.wall_bool[0].length;
        const height = this.wall.height / this.wall_bool.length;
        
        for (let y = 0; y < this.wall_bool.length; y++) {
            for (let x = 0; x < this.wall_bool[y].length; x++) {
                if (this.wall_bool[y][x] === 1) {
                    const brique = new Brique(width * x, height * y, width, height);
                    this.wall.addChild(brique.sprite);
                }
            }
        }
    }
}

export { Wall };