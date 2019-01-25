import { Model } from "./model";

export class Render extends Model {
  public imgsrc: string[] = [];
  public renderPriority: number = 1;

  public getImage: (src) => CanvasImageSource;

  /**
   * image to be drawn
   */
  protected image: CanvasImageSource;

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
}
