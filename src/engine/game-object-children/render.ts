import { Model } from "./model";
import { ImageAsset } from "../assets/image";

export class Render extends Model {
  /**
   * render priority, the lower the number
   * the object will be on top of others
   * @type {number}
   */
  public renderPriority: number = 1;

  /**
   * image to be drawn
   */
  protected image: CanvasImageSource | undefined;

  /**
   * update current image to src
   * @param src
   */
  public updateImageTo = src => {
    if (src === "") {
      this.image = undefined;
    } else {
      this.image = this.assets.get<ImageAsset>(src).get();
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
}
