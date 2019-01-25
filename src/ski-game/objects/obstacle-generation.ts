import { GameObject } from "../../engine/game-object";
import { Obstacle, ObstacleIMAGES } from "./obstacle";
import { Directions2D } from "../../engine/common";

class ObstacleGeneration extends GameObject {
  private obs = new Obstacle();
  private maxGenerated: number = 10;
  private hiddenArea: number = 500;

  /**
   * process generation on each frame
   */
  public update = () => {
    this.generateObstacles();
  };

  /**
   * generates obstacles if needed
   */
  public generateObstacles = () => {
    const player = this.getObjectInstance("player");

    if (player) {
      if (
        player.direction === Directions2D.DOWN_LEFT ||
        player.direction === Directions2D.DOWN_RIGHT ||
        player.direction === Directions2D.DOWN
      ) {
        const randomImage = this.obs.imgsrc[
          this.getRandomInteger(0, this.obs.imgsrc.length)
        ];
        const o = this.createObstacle(randomImage);
        if (o) {
          this.addObject(o);
          o.updateImageTo(randomImage);
        }
      }
    }
  };

  /**
   * counts the amount of obstacles that have been generated
   * outside of the screen
   * @returns {number}
   */
  public getObstaclesGeneratedCount = (): number => {
    const obs = this.getObjectsById("obs");
    const game = this.getGameInstance();
    if (obs) {
      return obs.filter(o => {
        return o.pos.y > game.height;
      }).length;
    }
    return 0;
  };

  /**
   * creates an obstacle is allowed to
   * @param {ObstacleIMAGES} oi
   * @returns {Obstacle | null}
   */
  public createObstacle = (oi: ObstacleIMAGES): Obstacle | null => {
    if (this.getObstaclesGeneratedCount() < this.maxGenerated) {
      const o = new Obstacle();
      const game = this.getGameInstance();
      o.pos.x = this.getRandomInteger(-500, game.width + 500);
      o.pos.y = this.getRandomInteger(
        game.height,
        game.height + this.hiddenArea
      );
      o.renderPriority = 0;

      if (oi === ObstacleIMAGES.tree1) {
        o.width = 50;
        o.height = 50;
      }
      if (oi === ObstacleIMAGES.rock1 || oi === ObstacleIMAGES.rock2) {
        o.width = 30;
        o.height = 30;
      }
      if (oi === ObstacleIMAGES.tree2) {
        o.width = 75;
        o.height = 75;
      }
      return o;
    }
    return null;
  };

}

const og = new ObstacleGeneration();
export const obstacleGenerator = og;
