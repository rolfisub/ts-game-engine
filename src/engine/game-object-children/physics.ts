import { Helper } from "./helper";

export class Physics extends Helper {
  /**
   * General game object props
   */

  public solid: boolean = true;

  /**
   * checks if this object collides with any other group of objects
   */
  public isCollisionWith = (objectId: string): boolean => {
    if (!this.solid) {
      return false;
    }
    const obs = this.getObjectsById(objectId);
    const game = this.getGameInstance();
    if (obs) {
      const inScreen = obs.filter(o => {
        return (
          o.pos.x > 0 &&
          o.pos.x < game.width &&
          o.pos.y > 0 &&
          o.pos.y < game.height
        );
      });
      const cal = 10;
      const colliding = inScreen.filter(o => {
        return (
          this.pos.x + cal < o.pos.x + o.width &&
          this.pos.x + this.width - cal > o.pos.x &&
          this.pos.y + cal < o.pos.y + o.height &&
          this.pos.y + this.height - cal > o.pos.y
        );
      });
      const solidsColliding = colliding.filter(o => {
        return o.solid;
      });
      return solidsColliding.length > 0;
    }
    return false;
  };
}
