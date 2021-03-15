import { GameObject } from "../../engine/game-object";
import { Square } from "./square";

export class Board extends GameObject {
  protected squares: Square[][] = [];
}
