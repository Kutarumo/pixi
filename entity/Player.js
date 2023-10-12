import { PoolEntities } from './PoolEntities.js';
import { Shoot } from './Shoot.js';

class Player {

    constructor(app) {
        this.app = app;
        this.shoots = new PoolEntities()
        this.sprite = null;
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
    
        this.loader = new PIXI.Loader();
    
        this.loader.add('python', './python.png').load((loader, resources) => {
            console.log(resources);
  
            if (resources.python) {
                this.createSprite(resources.python.texture);
                this.setupEventListeners();
                this.addPool()
                this.addToStage();
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

    addPool(){
        if (this.shoots.entities.length == 0) return
        this.shoots.entities.forEach(entity => {
            // Ajoutez l'entité à la scène (stage) pour qu'elle soit affichée
            this.app.stage.addChild(entity.sprite);
        });
    }

    addToStage() {
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
        if (event.key === 'ArrowLeft') { this.isLeftKeyDown = false; } 
        else if (event.key === 'ArrowRight') { this.isRightKeyDown = false; }
        else if (event.key == ' ') {
            if (this.shoots.entities.length == 0) {
                this.shoots.addEntity(new Shoot(this.app, this.PlayerCenterX, this.PlayerCenterY))
            }
            
        }
    }

    PlayerCenterX() {
        return this.sprite.x + (this.sprite.width/2);
    }
    
    PlayerCenterY() {
        return this.sprite.y + (this.sprite.height/2);
    }

    update() {
        const playerSpeed = 5;
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