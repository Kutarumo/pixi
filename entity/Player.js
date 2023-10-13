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
    
        this.loader.add('sprite_player', './entity/assets/sprite_player.png').load((loader, resources) => {
            console.log(resources);
            if (resources.sprite_player) {
                this.createSprite(resources.sprite_player.texture);                
                this.setupEventListeners();
                this.app.ticker.add(this.update.bind(this));
            } else {
                console.error("L'image 'sprite_player' n'a pas été chargée correctement.");
            }
        });
    }
  
    createSprite(texture) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = 250;
        this.sprite.y = 350;
        this.createCollision();
        this.sprite.scale.set(0.3, 0.3);
        this.app.stage.addChild(this.sprite);
    }

    createCollision() {
        this.boundingBox = new PIXI.Graphics();
        this.boundingBox.beginFill(0x000000, 0);
        this.boundingBox.lineStyle(1, 0xFF0000);
        this.boundingBox.drawRect(0, 0, this.sprite.width, this.sprite.height);
        this.boundingBox.endFill();
        this.sprite.addChild(this.boundingBox);
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
            this.bullet = new Bullet(this.app);
            game.pool.push(bullet);
            this.app.stage.addChild(this.bullet.sprite);
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