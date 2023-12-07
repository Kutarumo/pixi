import { Brique } from './Brique.js';

/**
 * Represents a wall composed of bricks in the game.
 */
class Wall {
    /**
     * Creates an instance of the Wall class.
     * @param {Game} game - The game instance.
     * @param {number[]} coord - The initial coordinates of the wall.
     */
    constructor(game, coord) {
        this.game = game;
        this.coord = coord;

        // Configuration for the wall structure
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

    /**
     * Creates the wall by adding bricks to the game.
     */
    create_wall() {
        const width = this.width / this.wall_bool[0].length;
        const height = this.height / this.wall_bool.length;

        // Iterate through the wall configuration and create bricks as needed
        for (let y = 0; y < this.wall_bool.length; y++) {
            for (let x = 0; x < this.wall_bool[y].length; x++) {
                if (this.wall_bool[y][x] === 1) {
                    // Create a new brick and add it to the game's entity pool
                    const brique = new Brique(this.game, [this.coord[0] + width * x, this.coord[1] + height * y], width, height);
                    this.game.addPoolEntity(brique);
                    brique.addToScreen();
                }
            }
        }
    }
}

export { Wall };
