import { Game } from "../common/game";
import { myPlayer } from "./objects/player";

export class SkiGame extends Game {}

const sg = new SkiGame();
sg.el = "#myCanvas";

sg.addObject(myPlayer);

sg.init();

export const skiGame = sg;
