import { Game } from "../engine/game";
import { mp } from "./objects/player";
import { obstacleGeneration } from "./objects/obstacle-generation";

export class SkiGame extends Game {}

const sg = new SkiGame();
sg.el = "#myCanvas";
sg.init();
sg.addObject(obstacleGeneration);
sg.addObject(mp);

export const skiGame = sg;
