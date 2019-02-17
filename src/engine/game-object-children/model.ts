import { Vector2D } from "../common";
import { AssetManager } from "../asset-manager";

export class Model {
  /**
   * Identifier for the object model
   * @type {string}
   */
  public id: string = "gameObject";

  /**
   * XY coordinates of the object in the canvas
   * @type {{x: number; y: number}}
   */
  public pos: Vector2D = { x: 50, y: 50 };

  /**
   * width and height of the object
   * @type {number}
   */
  public width: number = 50;
  public height: number = 50;

  /**
   * asset manager injected
   */
  protected assets: AssetManager;

  /**
   * set the asset manager from outside
   * @param {AssetManager} am
   */
  public setAssetManager = (am: AssetManager) => {
    this.assets = am;
  };
}
