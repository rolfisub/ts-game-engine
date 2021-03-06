import { GameObject } from "./game-object";
import { Vector2D } from "./common";
import * as $ from "jquery";
import { AssetManager, AssetType } from "./asset-manager";

export class Game {
  public width: number;
  public height: number;
  public el: string;

  /**
   * game object store
   * @type {any[]}
   */
  public objects: GameObject[] = [];

  /**
   * Asset Store Manager
   * @type {AssetManager}
   */
  private assets = new AssetManager();

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
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

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
   * @param {GameObject} o
   * @returns {Game}
   */
  public addObject = (o: GameObject) => {
    this.objects.push(o);
    this.initObject(o);
    return this;
  };

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
    this.injectGameApi(o);
    o.init();
  };

  /**
   * injects game api to game objects
   * @param {GameObject} o
   */
  private injectGameApi = (o: GameObject) => {
    o.getObjectInstance = this.getObjectInstance;
    o.getObjectsById = this.getObjectsById;
    o.addObject = this.addObject;
    o.getGameInstance = () => this;
    o.setAssetManager(this.assets);
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
