import { Base } from "../libs/base.js";
import { RegisterScore } from "../ui/Register_score.js";
import { ScoreList } from "../ui/score_list.js";

class ScoreMenu extends Base{
    constructor(app, score) {
        super(app);
        this.users = [];
        this.score = score;
        this.addScore();
    }

    destroy() {
        super.destroy();
        this.add_score.removeEventListener();
        this.app.stage.removeChild(this.add_score.textObj);
        this.app.stage.removeChild(this.add_score_list.textObj);
    }

    addScore() {
        this.add_score = new RegisterScore(this, [400, 400], this.score);
        this.add_score_list = new ScoreList(this, [400, 500]);
    }

    update() {
        super.update();
        this.add_score.update();
        this.add_score_list.update();
    }
}

export { ScoreMenu };