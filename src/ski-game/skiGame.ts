import { Game } from "../engine/game";
import { player } from "./objects/player";
import { obstacleGenerator } from "./objects/obstacle-generation";
import { rhinoGenerator } from "./objects/rhino-generation";
import { rampGenerator } from "./objects/ramp-generation";

const sg = new Game("#myCanvas");
sg.init();
sg.addObject(obstacleGenerator);
sg.addObject(rhinoGenerator);
sg.addObject(rampGenerator);
sg.addObject(player);

export const skiGame = sg;
