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
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = 250;
        this.sprite.y = 350;
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
            this.bullet = new Bullet(
                this.app, 
                this.pool,
                2, 
                this.SpriteCenterX(), 
                this.SpriteCenterY()
            );
            this.pool.push(this.bullet);
        }
    }
    checkCollisionsWithBullets() {
        const toleranceRadius = 10; // Vous pouvez ajuster cette valeur
    
        // Filtrer les balles dans la pool
        const bullets = this.pool.filter((entity) => entity instanceof Bullet);
    
        for (const bullet of bullets) {
            let bulletX = bullet.sprite.x;
            let bulletY = bullet.sprite.y;
    
            // Vérifiez la collision avec la balle
            if (
                bulletX >= this.sprite.x - toleranceRadius &&
                bulletX <= this.sprite.x + this.sprite.width + toleranceRadius &&
                bulletY >= this.sprite.y - toleranceRadius &&
                bulletY <= this.sprite.y + this.sprite.height + toleranceRadius
            ) {
                // Gérez la collision, par exemple, réduisez la santé du joueur et de la balle
                this.hp -= 1;
                bullet.hp -= 1;
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
        this.checkCollisionsWithBullets()
    }

    remove() {
        const index = this.pool.indexOf(this);
        this.pool.splice(index, 1);
        this.destroy();
    }
}

export { Player };