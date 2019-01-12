import { AnimatedObject, Animation } from "../../engine/animatedObject";
import { Player } from "./player";

export class Rhino extends AnimatedObject {
  public id: string = "rhino";
  public width: number = 100;
  public height: number = 100;
  public speed: number = 7;
  public moving: boolean = false;
  public playerFound: boolean = false;


  public runAnimation: Animation = {
    images: ["img/rhino_run_left.png", "img/rhino_run_left_2.png"],
    speed: 150,
    repeat: true,
    running: false
  };

  public eatAnimation: Animation = {
    images: [
      "img/rhino_lift.png",
      "img/rhino_lift_mouth_open.png",
      "img/rhino_lift_eat_1.png",
      "img/rhino_lift_eat_2.png",
      "img/rhino_lift_eat_3.png",
      "img/rhino_lift_eat_4.png"
    ],
    speed: 450,
    repeat: false,
    running: false
  };

  /**
   * move towards the player
   */
  public moveToPlayer = () => {
    const player = this.getObjectInstance("player");
    if (player) {
      this.moveTo(player.pos);
    }
  };

  /**
   * kills the player
   */
  public killPlayer = () => {
    const player = this.getObjectInstance("player") as Player;
    if (player) {
      player.killPlayer();
    }
  };

  public update = () => {
    if (!this.playerFound && this.moving) {
      this.moveToPlayer();
      if (this.isCollisionWith("player")) {
        this.stopCurrentAnimation();
        this.playerFound = true;
        this.moving = false;
        this.killPlayer();
        setTimeout(() => {
          this.startAnimation("eat");
        }, 100);
      }
    } else if (!this.moving && !this.playerFound) {
      this.moving = true;
      this.startAnimation("run");
    }
  };
}
