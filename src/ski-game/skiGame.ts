import { Game } from "../engine/game";
import { mp } from "./objects/player";
import { bg } from "./objects/background";

export class SkiGame extends Game {}

const sg = new SkiGame();
sg.el = "#myCanvas";
sg.width = 300;
sg.height = 200;
sg.init();


sg.addObject(bg);
sg.addObject(mp);


export const skiGame = sg;
