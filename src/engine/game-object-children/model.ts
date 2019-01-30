import { Vector2D } from "../common";
import { AssetManager } from "../asset-manager";

export class Model {
  /**
   * Identifier for the object model
   * @type {string}
   */
  public id: string = "";

  public pos: Vector2D = { x: 50, y: 50 };

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
