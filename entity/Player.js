import { Entity } from './Entity.js';
import { Shoot } from './Shoot.js';

class Player {

    constructor(app) {
        this.app = app;
        this.shoots = new Entity(app)
        this.sprite = null;
        this.isLeftKeyDown = false;
        this.isRightKeyDown = false;
    
        this.loader = new PIXI.Loader();
    
        this.loader.add('python', './python.png').load((loader, resources) => {
            console.log(resources);
  
            if (resources.python) {
                this.createSprite(resources.python.texture);
                this.setupEventListeners();
                this.addToStage();
                this.addShootPool();
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

    addToStage() {
        this.app.stage.addChild(this.sprite);
    }
    
    addShootPool() {
        if (this.shoots.length == 0) return 
        for (let i = 0; i < this.shoots.length; i++) {
            this.app.stage.addChild(this.shoots[i])
        }
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
            this.shoots.addSprite(new Shoot(this.app, this.sprite.x, this.sprite.y))
        }
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