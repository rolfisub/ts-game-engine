import { Directions2D, Vector2D } from "./common";

export class GameObject2D {
  public width: number;
  public height: number;
  public pos: Vector2D;
  public imgsrc: string;
  public speed: number;
  public direction: Directions2D;
  public getImage: (src) => CanvasImageSource;
  private image: CanvasImageSource;

  /**
   * function that is called when initializing an object
   * by default it loads the default image
   */
  public init = () => {
    if (this.imgsrc) {
      this.image = this.getImage(this.imgsrc);
    }
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
   * basic move function
   */
  public move = () => {
    switch (this.direction) {
      case Directions2D.DOWN: {
        this.pos.x += this.speed;
        break;
      }
      case Directions2D.DOWN_LEFT: {
        this.pos.x += this.speed;
        this.pos.y += -1 * this.speed;
        break;
      }
      case Directions2D.DOWN_RIGHT: {
        this.pos.x += this.speed;
        this.pos.y += this.speed;
        break;
      }
      case Directions2D.LEFT: {
        this.pos.y += -1 * this.speed;
        break;
      }
      case Directions2D.RIGHT: {
        this.pos.y += this.speed;
        break;
      }
      case Directions2D.UP: {
        this.pos.x += -1 * this.speed;
        break;
      }
      case Directions2D.UP_RIGHT: {
        this.pos.x += -1 * this.speed;
        this.pos.y += this.speed;
        break;
      }
      case Directions2D.UP_LEFT: {
        this.pos.x += -1 * this.speed;
        this.pos.y += -1 * this.speed;
        break;
      }
      default: {
        //do nothing
      }
    }
  };
}
