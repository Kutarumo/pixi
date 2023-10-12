import { Entity } from './Entity.js';
import { Bullet } from './Bullet.js';

class Player extends Entity {

    constructor(app) {
        super(app)
        this.app = app;
        this.sprite = null;
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
    
        this.loader = new PIXI.Loader();
    
        this.loader.add('python', './python.png').load((loader, resources) => {
            console.log(resources);
  
            if (resources.python) {
                this.createSprite(resources.python.texture);
                this.setupEventListeners();
                this.app.ticker.add(this.update.bind(this));
            } else {
                console.error("L'image 'python' n'a pas été chargée correctement.");
            }
        });
    }
  
    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.05, 0.05);
        this.sprite.x = 250;
        this.sprite.y = 350;
        this.app.stage.addChild(this.sprite);
    }

    setupEventListeners() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') { this.isLeftKeyDown = true; } 
        else if (event.key === 'ArrowRight') { this.isRightKeyDown = true; }
    }

    handleKeyUp(event) {
        if (event.key === 'ArrowLeft') this.isLeftKeyDown = false;
        else if (event.key === 'ArrowRight') this.isRightKeyDown = false;
        else if (event.key == ' ') {
            const bullet = new Bullet(this.app, this.PlayerCenterX(), this.PlayerCenterY());
            this.app.stage.addChild(bullet.sprite);
            game.pool.push(bullet);
        }
    }

    PlayerCenterX() {
        return this.sprite.x + (this.sprite.width/2);
    }
    
    PlayerCenterY() {
        return this.sprite.y + (this.sprite.height/2);
    }

    update() {
        const playerSpeed = 3;
        if (this.hp <= 0) {
            this.destroy();
            return;
        }
        if (this.isLeftKeyDown) {
            if (this.sprite.x - playerSpeed >= 0) {
                this.sprite.x -= playerSpeed;
            }
        }
        if (this.isRightKeyDown) {
            if (this.sprite.x + this.sprite.width + playerSpeed <= this.app.renderer.width) {
                this.sprite.x += playerSpeed;
            }
        }
    }
}

export { Player };