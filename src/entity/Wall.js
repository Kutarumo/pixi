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
        ];
        this.width = 125;
        this.height = 100;
        this.create_wall();
    }

    create_wall() {
        const width = this.width / this.wall_bool[0].length;
        const height = this.height / this.wall_bool.length;
        for (let y = 0; y < this.wall_bool.length; y++) {
            for (let x = 0; x < this.wall_bool[y].length; x++) {
                if (this.wall_bool[y][x] === 1) {
                    const brique = new Brique(this.game, [this.coord[0] + width * x, this.coord[1] + height * y], width, height);
                    this.game.addPoolEntity(brique);
                    brique.addToScreen();
                }
            }
        }
    }
}

export { Wall };