import { Game } from "../engine/game";
import { mp } from "./objects/player";
import { bg } from "./objects/background";
import { obs1 } from "./objects/obstacle";

export class SkiGame extends Game {}

const sg = new SkiGame();
sg.el = "#myCanvas";
sg.width = 300;
sg.height = 200;
sg.init();


sg.addObject(bg);
sg.addObject(obs1);
sg.addObject(mp);



export const skiGame = sg;
