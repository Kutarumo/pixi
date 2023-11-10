import { LivingEntity } from "../libs/LivingEntity.js";
import { textures } from "../libs/texturesLoader.js";
import { Bullet } from './Bullet.js';

class Player extends LivingEntity {

    constructor(game, textures, coord, scale, rotation, max_hp, hp) {
        super(game, textures, coord, scale, rotation, max_hp, hp);
        this.sprite = this.sprites.player;
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
        this.faction = "player";
        this.setupEventListeners();
        this.addToScreen();
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
        const playerSpeed = 3;
        if (this.isLeftKeyDown) {
            if (this.coord[0] - playerSpeed >= 0) {
                this.coord[0] -= playerSpeed;
            }
        }
        if (this.isRightKeyDown) {
            if (this.coord[0] + this.sprite.width + playerSpeed <= this.game.app.renderer.width) {
                this.coord[0] += playerSpeed;
            }
        }
        this.update_position()
    }
}

export { Player };