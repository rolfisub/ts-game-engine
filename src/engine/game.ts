import { GameObject } from "./gameObject";
import * as $ from "jquery";
import * as _ from "lodash";
import { Vector2D } from "./common";

export class Game {
  public width: number;
  public height: number;
  public el: string;
  public objects: GameObject[] = [];

  private images: object = {};
  private ctx: CanvasRenderingContext2D | null;
  private canvas: HTMLCanvasElement;

  /**
   * game constructor, element is required
   * @param {string} el
   * @param {number} width
   * @param {number} height
   */
  constructor(el: string, width?: number, height?: number) {
    this.el = el;
    this.width = width ? width : window.innerWidth;
    this.height = height ? height : window.innerHeight;
  }

  /**
   * initialize canvas
   */
  public init = () => {
    this.canvas = $<HTMLCanvasElement>(this.el)
      .attr("width", this.width * window.devicePixelRatio)
      .attr("height", this.height * window.devicePixelRatio)
      .css({
        width: this.width + "px",
        height: this.height + "px",
        border: "1px solid"
      })[0];
    $(this.el).on("click", this.handleMouseClick);
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
      this.objects
        //render priority
        .sort((a, b) => a.renderPriority - b.renderPriority)
        //process state and render
        .forEach(o => {
          o.update();
          o.render(this.ctx);
        });
      this.ctx.restore();
      requestAnimationFrame(this.gameLoop);
    }
  };
  /**
   * adds an object to be rendered in the game
   * @param {GameObject} obj
   * @returns {this}
   */
  public addObject = (o: GameObject) => {
    this.objects.push(o);
    this.initObject(o);
    return this;
  };

  /**
   * gets an image resource
   * @param {string} src
   * @returns {any}
   */
  protected getImage = (src: string) => this.images[src];

  /**
   * gets an instance of an object, the first one found
   * @param {string} id
   * @returns {any}
   */
  protected getObjectInstance = (id: string): GameObject | undefined =>
    this.objects.find(obj => {
      return obj.id === id;
    });

  /**
   * gets a list of objects that match an id
   * @param {string} id
   * @returns {GameObject[] | undefined}
   */
  protected getObjectsById = (id: string): GameObject[] | undefined => {
    const res = this.objects.filter(obj => {
      return obj.id === id;
    });
    if (res.length > 0) {
      return res;
    }
    return undefined;
  };

  /**
   * initializes an object
   * @param {GameObject} o
   */
  private initObject = (o: GameObject) => {
    this.loadImage(o.imgsrc);
    this.injectGameApi(o);
    o.init();
  };

  /**
   * injects game api to game objects
   * @param {GameObject} o
   */
  private injectGameApi = (o: GameObject) => {
    o.getImage = this.getImage;
    o.getObjectInstance = this.getObjectInstance;
    o.getObjectsById = this.getObjectsById;
    o.addObject = this.addObject;
    o.getGameInstance = () => this;
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
   * load an array of images in to memory
   * @param {string[]} imgsrc
   */
  private loadImage = (imgsrc: string[]) => {
    if (_.isArray(imgsrc)) {
      imgsrc.forEach(isrc => {
        if (isrc && !this.images[isrc]) {
          this.images[isrc] = new Image();
          this.images[isrc].src = isrc;
        }
      });
    }
  };

  /**
   * gets objects that their area is on x,y
   * @param {Vector2D} pos
   * @returns {GameObject[]}
   */
  private getObjectsInPos = (pos: Vector2D): GameObject[] => {
    return this.objects.filter(o => {
      return (
        pos.x >= o.pos.x &&
        pos.x <= o.pos.x + o.width &&
        pos.y >= o.pos.y &&
        pos.y <= o.pos.y + o.height
      );
    });
  };

  /**
   * pass event to game objects located in xy
   * @param event
   */
  private handleMouseClick = event => {
    const objs = this.getObjectsInPos({
      x: event.offsetX,
      y: event.offsetY
    });

    objs.forEach(o => o.onClick(event));
  };
}
