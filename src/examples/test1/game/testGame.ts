import { Game } from "../../../engine/game";
import { testObj, testObj2 } from "../components/test";

const game = new Game();

game.el = "#myCanvas";
game.addObject(testObj);
game.addObject(testObj2);
game.init();

export const testGame = game;
