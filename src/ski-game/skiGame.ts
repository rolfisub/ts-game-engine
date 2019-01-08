import { Game } from "../common/game";
import { mp } from "./objects/player";

export class SkiGame extends Game {}

const sg = new SkiGame();
sg.el = "#myCanvas";
sg.init();

sg.addObject(mp);



export const skiGame = sg;
