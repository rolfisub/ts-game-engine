import { Directions2D, Vector2D } from "./common";
import { Game } from "./game";

export class GameObject {
  /**
   * General game object props
   */
  public id: string = "";
  public width: number = 50;
  public height: number = 50;
  public pos: Vector2D = { x: 50, y: 50 };
  public imgsrc: string[] = [];
  public speed: number = 1;
  public direction: Directions2D = Directions2D.NONE;
  public renderPriority: number = 1;

  /**
   * game API
   */
  public getImage: (src) => CanvasImageSource;
  public getObjectInstance: (id: string) => GameObject | undefined;
  public getObjectsById: (id: string) => GameObject[] | undefined;
  public addObject: (GameObject2D) => void;
  public getGameInstance: () => Game;

  /**
   * image to be drawn
   */
  protected image: CanvasImageSource;

  /**
   * function that is called when initializing an object
   * by default it loads the default image
   */
  public init = () => {
    if (this.imgsrc) {
      this.image = this.getImage(this.imgsrc[0]);
    }
  };

  /**
   * update current image to src
   * @param src
   */
  public updateImageTo = src => {
    this.image = this.getImage(src);
  };

  /**
   * basic rendering function
   * @param {CanvasRenderingContext2D} ctx
   */
  public render = (ctx: CanvasRenderingContext2D | null) => {
    if (ctx && this.image) {
      ctx.drawImage(
        this.image,
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
      );
    }
  };

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
    let theDirection = direction ? direction : this.direction;
    let theSpeed = speed ? speed : this.speed;

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
