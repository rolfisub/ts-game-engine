import { Vector2D } from "../common";

export class Model {
  /**
   * Identifier for the object model
   * @type {string}
   */
  public id: string = "";

  public pos: Vector2D = { x: 50, y: 50 };

  public width: number = 50;
  public height: number = 50;
}