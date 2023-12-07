/**
 * Base class representing the core functionality of the game.
 * @class
 */
class Base {
    /**
     * Creates an instance of the Base class.
     * @param {PIXI.Application} app - The PIXI.Application instance.
     */
    constructor(app) {
        // Initialize properties
        this.app = app;
        this.pool = [];

        // Load the PIXI application
        this.loadApp();

        // Add the update function to the PIXI ticker
        this.app.ticker.add(() => {
            this.update(this.app.ticker.deltaMS);
        });
    }

    /**
     * Adds an entity to the entity pool.
     * @param {Entity} entityToAdd - The entity to add to the pool.
     */
    addPoolEntity(entityToAdd) {
        this.pool.push(entityToAdd);
    }

    /**
     * Removes an entity from the entity pool.
     * @param {Entity} entityToRemove - The entity to remove from the pool.
     */
    removePoolEntity(entityToRemove) {
        const index = this.pool.indexOf(entityToRemove);
        if (index !== -1) {
            this.pool.splice(index, 1);
        }
    }

    /**
     * Loads the PIXI application and appends it to the document body.
     */
    loadApp() {
        document.body.appendChild(this.app.view);
    }

    /**
     * Updates the game state based on the elapsed time.
     * @param {number} delta - The time elapsed since the last frame.
     */
    update(delta) {
        this.pool.forEach((entity) => {
            entity.update(delta);
        });
    }
}

// Export the Base class for use in other modules
export { Base };
