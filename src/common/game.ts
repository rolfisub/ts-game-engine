import { GameObject2D } from "./gameObject2D";
import * as $ from "jquery";
import * as _ from "lodash";

export class Game {
  public width: number = window.innerWidth;
  public height: number = window.innerHeight;
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
    this.objects.forEach(o => {
      this.initObject(o);
    });
  };
  /**
   * main render method
   */
  public gameLoop = () => {
    if (this.ctx) {
      this.ctx.save();
      this.clearCanvas();
      this.objects.forEach(o => {
        o.update();
        o.render(this.ctx);
      });
      this.ctx.restore();
      requestAnimationFrame(this.gameLoop);
    }
  };
  /**
   * adds an object to be rendered in the game
   * @param {GameObject2D} obj
   * @returns {this}
   */
  public addObject = (o: GameObject2D) => {
    this.objects.push(o);
    this.initObject(o);
    return this;
  };

  /**
   * initializes an object
   * @param {GameObject2D} o
   */
  private initObject = (o: GameObject2D) => {
    this.loadImage(o.imgsrc);
    o.getImage = src => this.images[src];
    o.init();
  };

  /**
   * clears the canvas screen
   */
  private clearCanvas = () => {
    if (this.ctx) {
      this.ctx.clearRect(
        0,
        0,
        this.width * window.devicePixelRatio,
        this.height * window.devicePixelRatio
      );
    }
  };

  /**
   * load an image in to memory or an array of images
   * @param {string | string[]} imgsrc
   */
  private loadImage = (imgsrc: string | string[]) => {
    if (_.isString(imgsrc)) {
      if (imgsrc && !this.images[imgsrc]) {
        this.images[imgsrc] = new Image();
        this.images[imgsrc].src = imgsrc;
      }
    }
    if (_.isArray(imgsrc)) {
      imgsrc.forEach(isrc => {
        if (isrc && !this.images[isrc]) {
          this.images[isrc] = new Image();
          this.images[isrc].src = isrc;
        }
      });
    }
  };
}
