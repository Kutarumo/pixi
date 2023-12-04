class Base {
    constructor(size) {
        this.size = size;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.load_app();
        
        this.app.ticker.add(() => { this.update(this.app.ticker.deltaMS) });
    }

    addPoolEntity(entity_to_add) {
        this.pool.push(entity_to_add);
    }

    removePoolEntity(entity) {
        const index = this.pool.indexOf(entity);
        if (index !== -1) {
            this.pool.splice(index, 1);
        }
    }

    load_app() {
        document.body.appendChild(this.app.view);
    }

    update(delta) {
        this.pool.forEach((entity) => {
            entity.update(delta);
        });
    }
}

export { Base };