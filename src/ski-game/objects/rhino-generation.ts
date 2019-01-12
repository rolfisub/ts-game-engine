import { GameObject } from "../../engine/gameObject";
import { Rhino } from "./rhino";
import { Player } from "./player";
import { Directions2D } from "../../engine/common";

class RhinoGeneration extends GameObject {
  public secondsToWait: number = 5;
  private lastPlayerIdle: number = Date.now();
  private lastPlayerMove: number = Date.now();
  private rhinoDeployed: boolean = false;

  /**
   * tracks when was the last time the player moved
   */
  public trackPlayer = () => {
    const player = this.getObjectInstance("player") as Player;
    if (this.isAnyKeyTrue(player)) {
      this.lastPlayerMove = Date.now();
    }
    if (
      this.areKeyStatesFalse(player) &&
      player.direction === Directions2D.NONE
    ) {
      this.lastPlayerIdle = Date.now();
    }
  };

  /**
   * checks if we need to deploy the rhino
   */
  public deployRhino = () => {
    if (!this.rhinoDeployed) {
      if (
        this.lastPlayerIdle >
        this.lastPlayerMove + this.secondsToWait * 1000
      ) {
        //deploy rhino
        this.rhinoDeployed = true;
        this.createRhino();
      }
    }
  };

  /**
   * main loop
   */
  public update = () => {
    this.trackPlayer();
    this.deployRhino();
  };

  /**
   * create and add rhino to the game
   */
  private createRhino = () => {
    const r = new Rhino();
    const game = this.getGameInstance();
    const player = this.getObjectInstance("player") as Player;

    r.pos = {
      x: game.width + 200,
      y: player.pos.y
    };
    r.addAnimation("run", r.runAnimation);
    r.addAnimation("eat", r.eatAnimation);

    game.addObject(r);
  };

  /**
   * check if player keystates are all false
   * @param {Player} player
   * @returns {boolean}
   */
  private areKeyStatesFalse = (player: Player): boolean => {
    return (
      !player.keyStates.left &&
      !player.keyStates.right &&
      !player.keyStates.up &&
      !player.keyStates.down
    );
  };

  /**
   * check if any keystates are true
   * @param {Player} player
   * @returns {boolean}
   */
  private isAnyKeyTrue = (player: Player): boolean => {
    return (
      player.keyStates.up ||
      player.keyStates.down ||
      player.keyStates.right ||
      player.keyStates.left
    );
  };
}

/*

*/

const rg = new RhinoGeneration();
export const rhinoGenerator = rg;
