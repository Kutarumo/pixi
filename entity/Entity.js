class Entity {
    constructor(app) {
        this.app = app; // Une instance de votre application PixiJS
        this.entities = [];
    }

    addSprite(sprite) {
        this.entities.push(sprite);
        this.app.stage.addChild(sprite);
    }

    removeSprite(sprite) {
        const index = this.entities.indexOf(sprite);
        if (index !== -1) {
            this.entities.splice(index, 1);
            this.app.stage.removeChild(sprite);
        }
    }

    update() {
        for (const sprite of this.entities) {
            // Vous pouvez ajouter ici toute logique de mise à jour spécifique à chaque sprite
        }
    }

    // Vous pouvez ajouter d'autres méthodes de gestion des sprites selon vos besoins

    clear() {
        for (const sprite of this.entities) {
            this.app.stage.removeChild(sprite);
        }
        this.entities = [];
    }
}