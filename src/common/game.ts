import { GameObject2D } from "./gameObject2D";
import * as $ from "jquery";

export class Game {
  public width: number;
  public height: number;
  public el: string;
  public objects: GameObject2D[] = [];

  private images: object = {};
  private ctx: CanvasRenderingContext2D | null;
  private canvas: HTMLCanvasElement;

  /**
   * initialize canvas
   */
  public init = () => {
    this.canvas = $<HTMLCanvasElement>(this.el)
      .attr("width", this.width * window.devicePixelRatio)
      .attr("height", this.height * window.devicePixelRatio)
      .css({
        width: this.width + "px",
        height: this.height + "px"
      })[0];
    this.ctx = this.canvas.getContext("2d");
    if (this.ctx) {
      //clear screen with a rect
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.objects.forEach(o => {
      if (o.imgsrc && !this.images[o.imgsrc]) {
        this.images[o.imgsrc] = new Image();
        this.images[o.imgsrc].src = o.imgsrc;
      }
      o.getImage = src => this.images[src];
      o.init();
    });
  };
  /**
   * main render method
   */
  public renderAll = () => {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.objects.forEach(o => {
        o.move();
        o.render(this.ctx);
      });
      this.ctx.restore();
      requestAnimationFrame(this.renderAll);
    }
  };
  /**
   * adds an object to be rendered in the game
   * @param {GameObject2D} obj
   * @returns {this}
   */
  public addObject = (obj: GameObject2D) => {
    this.objects.push(obj);
    return this;
  };
}
