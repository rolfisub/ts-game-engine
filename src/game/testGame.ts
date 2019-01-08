import { Game } from "../common/game";
import { testObj } from "../components/test";

const game = new Game();

game.el = "#myCanvas";
game.width = window.innerWidth;
game.height = window.innerHeight;
game.addObject(testObj);

game.init();

export const testGame = game;
