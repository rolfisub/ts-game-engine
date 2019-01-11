import { Game } from "../engine/game";
import { player } from "./objects/player";
import { obstacleGeneration } from "./objects/obstacle-generation";
import { testAnimation } from "../examples/test1/components/animation-test";

const sg = new Game("#myCanvas");
sg.init();
sg.addObject(obstacleGeneration);
sg.addObject(testAnimation);
sg.addObject(player);

export const skiGame = sg;
