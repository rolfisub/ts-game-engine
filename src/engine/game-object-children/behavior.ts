import { Model } from "./model";
import { Directions2D, Vector2D } from "../common";

export class Behavior extends Model {
  public speed: number = 1;
  public direction: Directions2D = Directions2D.NONE;

  /**
   * make changes to the object state
   * by default movement is enabled
   */
  public update = () => {
    this.move();
  };

  /**
   * built in basic move function
   */
  public move = (direction?: Directions2D, speed?: number) => {
    const theDirection = direction ? direction : this.direction;
    const theSpeed = speed ? speed : this.speed;

    switch (theDirection) {
      case Directions2D.DOWN: {
        this.pos.y += theSpeed;
        break;
      }
      case Directions2D.DOWN_LEFT: {
        this.pos.y += theSpeed;
        this.pos.x += -1 * theSpeed;
        break;
      }
      case Directions2D.DOWN_RIGHT: {
        this.pos.x += theSpeed;
        this.pos.y += theSpeed;
        break;
      }
      case Directions2D.LEFT: {
        this.pos.x += -1 * theSpeed;
        break;
      }
      case Directions2D.RIGHT: {
        this.pos.x += theSpeed;
        break;
      }
      case Directions2D.UP: {
        this.pos.y += -1 * theSpeed;
        break;
      }
      case Directions2D.UP_RIGHT: {
        this.pos.y += -1 * theSpeed;
        this.pos.x += theSpeed;
        break;
      }
      case Directions2D.UP_LEFT: {
        this.pos.y += -1 * theSpeed;
        this.pos.x += -1 * theSpeed;
        break;
      }
      default: {
        //do nothing
      }
    }
  };

  /**
   * move object to a vector
   * @param {Vector2D} to
   */
  public moveTo = (to: Vector2D) => {
    //calculate direction
    let toX = to.x - this.pos.x;
    let toY = to.y - this.pos.y;

    //normalize
    const toObjLength = Math.sqrt(toX * toX + toY * toY);
    toX /= toObjLength;
    toY /= toObjLength;

    //Move towards the object
    this.pos.x += toX * this.speed;
    this.pos.y += toY * this.speed;
  };
}