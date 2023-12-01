import { LivingEntity } from "../libs/LivingEntity.js";
import { TexturesLoader } from '../libs/texturesLoader.js';
import { Bullet } from './Bullet.js';

class Player extends LivingEntity {

    constructor(game, coord, hp, max_hp, force, speed, sprites, scale, rotation) {
        super(game, coord, hp, max_hp, force, speed, sprites, scale, rotation);
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
        this.owner = "player";
        this.isHit = false;
        this.hitTime = 0;
        this.setupEventListeners();
        this.eventListenersSet = true;

        this.sprite.play();
        this.addToScreen();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
        this.eventListenersSet = true;
    }

    removeEventListener() {
        window.removeEventListener('keydown', (event) => this.handleKeyDown(event));
        window.removeEventListener('keyup', (event) => this.handleKeyUp(event));
        this.eventListenersSet = false;
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') { this.isLeftKeyDown = true; } 
        else if (event.key === 'ArrowRight') { this.isRightKeyDown = true; }
    }

    handleKeyUp(event) {
        if (event.key === 'ArrowLeft') this.isLeftKeyDown = false;
        else if (event.key === 'ArrowRight') this.isRightKeyDown = false;
        else if (event.key == ' ') {
            if (!this.game.pool.filter(bullet => bullet instanceof Bullet).some(bullet => bullet.owner === this.owner)) {
                                                //game, coord, hp, max_hp, force, speed, sprites, scale, rotation, owner
                this.addPoolEntity(new Bullet(this.game, [...this.coord], 1, 1, 1, 3, this.game.texturesLoader.textures[2][0], 3, 0, this.owner));
            }
        }
    }

    movement() {
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
    }

    update(delta) {
        this.movement();
        super.update();
    }
}

export { Player };