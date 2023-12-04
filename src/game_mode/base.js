class Base {
    constructor(app) {
        this.app = app;
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