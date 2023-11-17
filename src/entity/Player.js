import { Animation } from "../libs/Animation.js";
import { Bullet } from './Bullet.js';

class Player extends Animation {

    constructor(game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, repeat) {
        super(game, coord, hp, max_hp, force, speed, sprites, animation_rate, state, scale, rotation, repeat);
        this.game = game;
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
        this.faction = state;
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    removeEventListener() {
        window.removeEventListener('keydown', (event) => this.handleKeyDown(event));
        window.removeEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') { this.isLeftKeyDown = true; } 
        else if (event.key === 'ArrowRight') { this.isRightKeyDown = true; }
    }

    handleKeyUp(event) {
        if (event.key === 'ArrowLeft') this.isLeftKeyDown = false;
        else if (event.key === 'ArrowRight') this.isRightKeyDown = false;
        else if (event.key == ' ') {
            if (!this.game.pool.filter(bullet => bullet instanceof Bullet).some(bullet => bullet.faction === this.faction)) {
                console.log(this.game.pool.filter(bullet => bullet instanceof Bullet).some(bullet => bullet.faction === this.faction))
                this.addPoolEntity(new Bullet(this.game, textures.bullet_player, [...this.coord], undefined, 5, 1, 1, 1, this.faction, 3));
            }
        }
    }
    
    update() {
        if (this.hp <= 0) {
            this.remove();
            return;
        }
        if (this.isLeftKeyDown) {
            if (this.coord[0] - this.speed >= 0) {
                this.coord[0] -= this.speed;
            }
        }
        if (this.isRightKeyDown) {
            if (this.coord[0] + this.sprite.width + this.speed <= this.game.app.renderer.width) {
                this.coord[0] += this.speed;
            }
        }
        this.update_position()
    }
}

export { Player };