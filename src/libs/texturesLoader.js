class TexturesLoader {
    constructor() {
        this.textures = [[[],[],[],[]],[],[[],[],[],[]]];
        this.BASE_PATH = './src/publics/';

        this.loadAliens();
        this.loadPlayer();
    }

    loadAliens() {
        for (let i = 0; i <= 2; i++) {
            this.textures[0][i].push(PIXI.Texture.from(this.BASE_PATH+"alien/"+(i+1)+"-1.png"));
            this.textures[0][i].push(PIXI.Texture.from(this.BASE_PATH+"alien/"+(i+1)+"-2.png"));
        }
        this.textures[0].push(PIXI.Texture.from(this.BASE_PATH+"alien/death.png"));
        console.log(this.textures);
    }

    loadPlayer() {

    }
}

export { TexturesLoader };