import { Game } from "../engine/game";
import { player } from "./objects/player";
import { obstacleGeneration } from "./objects/obstacle-generation";
import { Rhino } from "./objects/rhino";

const sg = new Game("#myCanvas");
sg.init();
sg.addObject(obstacleGeneration);
sg.addObject(player);

const r = new Rhino();
r.pos = {
  x: 0,
  y: 0
};
r.addAnimation("run", r.runAnimation);
r.addAnimation("eat", r.eatAnimation);
sg.addObject(r);

export const skiGame = sg;
