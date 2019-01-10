import { Game } from "../engine/game";
import { mp } from "./objects/player";
import { obstacleGeneration } from "./objects/obstacle-generation";

const sg = new Game("#myCanvas");
sg.init();
sg.addObject(obstacleGeneration);
sg.addObject(mp);

export const skiGame = sg;
