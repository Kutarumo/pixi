class Base {
    constructor(size) {
        this.size = size;
        this.app = new PIXI.Application({ width: this.size, height: this.size });
        this.pool = [];
        this.load_app();
        

        this.app.ticker.add(() => { this.update(this.app.ticker.deltaMS) });
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