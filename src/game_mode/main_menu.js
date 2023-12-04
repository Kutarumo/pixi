import { StartGame } from "../ui/start_game.js";
import { Base } from "./base.js";

class MainMenu extends Base{
    constructor(app) {
        super(app);
        this.setupMenu();
        this.start_game.textObj.eventMode = "static";
        this.start_game.textObj.cursor = "pointer";
        this.start_game.textObj.on("pointerdown", (event) => {
            console.log("click");
        });
        this.start_game.addToScreen();
    }

    setupMenu() {
        this.start_game = new StartGame(this, [400, 400]);
    }
}

export { MainMenu };