import { Entity } from './Entity.js';
import { Bullet } from './Bullet.js';

class Player extends Entity {

    constructor(app, pool) {
        super(app);
        this.app = app;
        this.pool = pool;
        this.sprite = null;
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
        this.bullet = null;
    
        this.loader = new PIXI.Loader();
    
        this.loader.add('sprite_player', './entity/assets/sprite_player.png').load((loader, resources) => {
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
        this.coord = [250, 350]
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
        this.sprite.scale.set(0.1, 0.1);
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
            const bullets = this.pool.filter(bullet => bullet instanceof Bullet);
            const player_bullet = bullets.some(bullet => bullet.owner == "player");
            if (!player_bullet) {
                const bullet = new Bullet(
                    this.app, 
                    "player",
                    this.pool,
                    2, 
                    this.SpriteCenterX(), 
                    this.SpriteCenterY()
                );
                this.pool.push(bullet);
            }
        }
    }
    
    update() {
        const playerSpeed = 3;
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
        this.coord[0] = this.SpriteCenterX();
        this.coord[1] = this.SpriteCenterY();
    }
}

export { Player };