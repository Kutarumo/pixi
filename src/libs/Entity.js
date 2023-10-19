import { extractFileName } from './Utils.js';

class Entity {
    constructor(game, textures, coord, scale, rotation) {
        this.game = game;
        this.sprites = {};
        this.scale = scale;
        this.rotation = rotation;
        this.sprite = new PIXI.Sprite();
        this.coord = coord;
        this.loader = new PIXI.Loader();

        this.addTextures(textures);
        this.game.app.ticker.add(this.update.bind(this));
    }

    addToScreen() {
        this.game.app.stage.addChild(this.sprite);
    }

    createSprite(name, resource) {
        if (this.sprite instanceof PIXI.Sprite) {
            if (this.scale !== undefined) this.sprite.scale.set(this.scale);
            if (this.rotation !== undefined) this.sprite.rotation = (Math.PI * this.rotation)/180;
        }
        this.sprites[name] = new PIXI.Sprite(resource);
        if (this.scale !== undefined) this.sprites[name].scale.set(this.scale);
        if (this.rotation !== undefined) this.sprites[name].rotation = (Math.PI *  this.rotation)/180;
    }

    changeSprite(sprite) {
        this.sprite.texture = this.sprites[sprite].texture;
    }

    addTextures(textures) {
        this.loader.load((loader, resources) => {
            for (const texture in textures) {
                this.createSprite(texture, textures[texture])
            }
        }, this);
    }

    getPoolEntity() {

    }

    addPoolEntity(entity_to_add) {
            this.game.pool.push(entity_to_add);
    }

    removePoolEntity(entity) {
        const index = this.game.pool.indexOf(entity);
        if (index !== -1) {
            this.game.pool.splice(index, 1);
        }
    }

    remove() {
        this.game.app.stage.removeChild(this.sprite);
        const index = this.game.pool.indexOf(this);
        if (index !== -1) {
            this.game.pool.splice(index, 1);
        }
        delete this.sprites;
    }

    update_position() {
        this.sprite.x = this.coord[0];
        this.sprite.y = this.coord[1];
    }

    update() {}
}

export { Entity };