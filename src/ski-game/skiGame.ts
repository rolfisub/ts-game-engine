import { Game } from "../engine/game";
import { mp } from "./objects/player";
import { obstacleGeneration } from "./objects/obstacle-generation";

export class SkiGame extends Game {

}

const sg = new SkiGame();
sg.el = "#myCanvas";
/*sg.width = 1024;
sg.height = 600;*/
sg.init();
sg.addObject(obstacleGeneration);
sg.addObject(mp);



export const skiGame = sg;
