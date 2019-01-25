import { Model } from "./model";
import { Game } from "../game";
import { GameObject } from "../game-object";
import { Directions2D } from "../common";

export class Helper extends Model {
  /**
   * game API
   */

  public getObjectInstance: (id: string) => GameObject | undefined;
  public getObjectsById: (id: string) => GameObject[] | undefined;
  public addObject: (GameObject2D) => void;
  public getGameInstance: () => Game;

  /**
   * gets a random integer from a range
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  protected getRandomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  /**
   * utility function (we might move this somewhere else in the future)
   * returns opposite direction
   * @param {Directions2D} dir
   * @returns {Directions2D}
   */
  protected getOppositeDirectionFrom = (dir: Directions2D): Directions2D => {
    if (dir === Directions2D.NONE) {
      return Directions2D.NONE;
    }
    switch (dir) {
      case Directions2D.UP: {
        return Directions2D.DOWN;
      }
      case Directions2D.DOWN: {
        return Directions2D.UP;
      }
      case Directions2D.RIGHT: {
        return Directions2D.LEFT;
      }
      case Directions2D.LEFT: {
        return Directions2D.RIGHT;
      }
      case Directions2D.DOWN_LEFT: {
        return Directions2D.UP_RIGHT;
      }
      case Directions2D.DOWN_RIGHT: {
        return Directions2D.UP_LEFT;
      }
      case Directions2D.UP_RIGHT: {
        return Directions2D.DOWN_LEFT;
      }
      case Directions2D.UP_LEFT: {
        return Directions2D.DOWN_RIGHT;
      }
      default: {
        return Directions2D.NONE;
      }
    }
  };
}
