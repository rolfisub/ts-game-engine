import { Game } from "../engine/game";
import { player } from "./objects/player";
import { obstacleGeneration } from "./objects/obstacle-generation";

const sg = new Game("#myCanvas");
sg.init();
sg.addObject(obstacleGeneration);
sg.addObject(player);

export const skiGame = sg;
