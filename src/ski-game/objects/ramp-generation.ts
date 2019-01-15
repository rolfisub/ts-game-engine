import { GameObject } from "../../engine/gameObject";
import { Ramp } from "./ramp";
import { Directions2D } from "../../engine/common";

class RampGeneration extends GameObject {
  private maxGenerated = 1;
  private hiddenArea = 500;
  private minTimeframe = 5000;

  public update = () => {
    this.generateRamp();
  };

  public generateRamp = () => {
    const player = this.getObjectInstance("player");

    if (player) {
      if (
        (player.direction === Directions2D.DOWN_LEFT ||
          player.direction === Directions2D.DOWN_RIGHT ||
          player.direction === Directions2D.DOWN) &&
        this.hasPlayerGoingDownMinTimeframe()
      ) {
        const o = this.createRamp();
        if (o) {
          this.addObject(o);
        }
      }
    }
  };

  public hasPlayerGoingDownMinTimeframe = (): boolean => {
    //TODO: need to check if enough time has passed
    return true;
  };

  public getRampGeneratedCount = (): number => {
    const ramps = this.getObjectsById("ramp");
    const game = this.getGameInstance();
    if (ramps) {
      return ramps.filter(o => {
        return o.pos.y > game.height;
      }).length;
    }
    return 0;
  };

  public createRamp = () => {
    if (this.getRampGeneratedCount() < this.maxGenerated) {
      const ramp = new Ramp();
      const game = this.getGameInstance();
      ramp.pos = {
        x: this.getRandomInteger(0, game.width),
        y: this.getRandomInteger(game.height, game.height + this.hiddenArea)
      };
      ramp.renderPriority = 0;
      return ramp;
    }
    return null;
  };
}

const rg = new RampGeneration();
export const rampGenerator = rg;
