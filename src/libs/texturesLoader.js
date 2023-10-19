class TextureLoader {
    constructor(file) {
        this.base_texture = PIXI.Texture.from(file);
    }

    createNewTexture(coord) {
        const base_texture = this.base_texture;
        const new_texture = new PIXI.Texture(
            base_texture,
            new PIXI.Rectangle(coord[0], coord[1], coord[2], coord[3])
        );
        return new_texture;
    }
}

const file = {
    "file_path": "./src/publics/115520.png",
    "texture_coord": {
        "death_bullet_alien": [61, 21, 6, 8],
        "death_bullet_player": [58, 49, 8, 8],
        "alien_death": [55, 1, 16, 8],
        "alien_1": {
            "alien": {
                "1": [1, 1, 16, 8],
                "2": [1, 11, 16, 8],

            },
            "bullet": {
                "1": [1, 21, 3, 8],
                "2": [6, 21, 3, 8],
                "3": [11, 21, 3, 8],
                "4": [16, 21, 3, 8],
            }
        },
        "alien_2": {
            "alien": {
                "1": [19, 1, 16, 8],
                "2": [19, 11, 16, 8],
            },
            "bullet": {
                "1": [21, 21, 3, 8],
                "2": [26, 21, 3, 8],
                "3": [31, 21, 3, 8],
                "4": [36, 21, 3, 8],
            }
        },
        "alien_3": {
            "alien": {
                "1": [37, 1, 16, 8],
                "2": [37, 11, 16, 8]
            },
            "bullet": {
                "1": [41, 21, 3, 8],
                "2": [46, 21, 3, 8],
                "3": [51, 21, 3, 8],
                "4": [56, 21, 3, 8]
            }       
        },
        "bonus": {
            "1": [1, 39, 16, 8],
            "death": [19, 39, 24, 8]
        },
        "player": {
            "player": [2, 49, 15, 8],
            "death_1": [20, 49, 15, 8],
            "death_2": [38, 49, 15, 8],
            "bullet": [55, 53, 1, 4]
        },
       
    },
        
}
const texture_loader = new TextureLoader(file.file_path);

const textures = {
    "player": {
        "player": texture_loader.createNewTexture(file.texture_coord.player.player),
        "death_1": texture_loader.createNewTexture(file.texture_coord.player.death_1),
        "death_2": texture_loader.createNewTexture(file.texture_coord.player.death_2),
    },
    "alien_1": {
        "alien_1": texture_loader.createNewTexture(file.texture_coord.alien_1.alien["1"]),
        "alien_2": texture_loader.createNewTexture(file.texture_coord.alien_1.alien["2"]),
        "death": texture_loader.createNewTexture(file.texture_coord.alien_death),
    },
    "alien_2": {
        "alien_1": texture_loader.createNewTexture(file.texture_coord.alien_2.alien["1"]),
        "alien_2": texture_loader.createNewTexture(file.texture_coord.alien_2.alien["2"]),
        "death": texture_loader.createNewTexture(file.texture_coord.alien_death),
    },
    "alien_3": {
        "alien_1": texture_loader.createNewTexture(file.texture_coord.alien_3.alien["1"]),
        "alien_2": texture_loader.createNewTexture(file.texture_coord.alien_3.alien["2"]),
        "death": texture_loader.createNewTexture(file.texture_coord.alien_death),
    },
    "bonus": {
        "bonus": texture_loader.createNewTexture(file.texture_coord.bonus["1"]),
        "death": texture_loader.createNewTexture(file.texture_coord.bonus.death)
    },
    "bullet_1": {
        "bullet_1": texture_loader.createNewTexture(file.texture_coord.alien_1.bullet["1"]),
        "bullet_2": texture_loader.createNewTexture(file.texture_coord.alien_1.bullet["2"]),
        "bullet_3": texture_loader.createNewTexture(file.texture_coord.alien_1.bullet["3"]),
        "bullet_4": texture_loader.createNewTexture(file.texture_coord.alien_1.bullet["4"]),
        "death": texture_loader.createNewTexture(file.texture_coord.death_bullet_alien)
    },
    "bullet_2": {
        "bullet_1": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["1"]),
        "bullet_2": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["2"]),
        "bullet_3": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["3"]),
        "bullet_4": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["4"]),
        "death": texture_loader.createNewTexture(file.texture_coord.death_bullet_alien)
    },
    "bullet_3": {
        "bullet_1": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["1"]),
        "bullet_2": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["2"]),
        "bullet_3": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["3"]),
        "bullet_4": texture_loader.createNewTexture(file.texture_coord.alien_2.bullet["4"]),
        "death": texture_loader.createNewTexture(file.texture_coord.death_bullet_alien)
    },
    "bullet_player": {
        "bullet": texture_loader.createNewTexture(file.texture_coord.player.bullet),
        "bullet_death": texture_loader.createNewTexture(file.texture_coord.death_bullet_player)
    }
};

export { textures }