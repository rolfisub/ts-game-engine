import { Game } from "../engine/game";
import { Test } from "./game/objects/test";

const testGame = new Game("#myCanvas");

testGame.init();
testGame.addObject(new Test());

requestAnimationFrame(testGame.gameLoop);
