class TexturesLoader {
    constructor() {
        this.textures = [[[],[],[],[]],[],[[],[],[],[]]];
        this.BASE_PATH = './src/publics/';
        this.path_floder = ['alien', 'player', 'bullet'];

        this.loadAliens();
        this.loadPlayer();
        this.loadBullets();
    }

    loadAliens() {
        for (let i = 0; i <= 2; i++) {
            this.textures[0][i].push(PIXI.Texture.from(this.BASE_PATH+"alien/"+(i+1)+"-1.png"));
            this.textures[0][i].push(PIXI.Texture.from(this.BASE_PATH+"alien/"+(i+1)+"-2.png"));
        }
        this.textures[0].push(PIXI.Texture.from(this.BASE_PATH+"alien/death.png"));
    }

    loadPlayer() {
        this.textures[1].push(PIXI.Texture.from(this.BASE_PATH+"player/Player.png")); 
    }

    loadBullets(){
        this.textures[2][0].push(PIXI.Texture.from(this.BASE_PATH+"bullet/1-1.png")); 
    }
    }
 
export { TexturesLoader };