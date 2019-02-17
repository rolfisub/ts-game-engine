import { Animation } from "../../engine/game-object-children/animated";
import { Player } from "./player";
import { GameObject } from "../../engine/game-object";
import { AssetType } from "../../engine/asset-manager";

enum Sounds {
  RUN = "assets/sounds/running.mp3",
  EAT = "assets/sounds/eating.mp3"
}

export class Rhino extends GameObject {
  public id: string = "rhino";
  public width: number = 100;
  public height: number = 100;
  public speed: number = 7;
  public moving: boolean = false;
  public playerFound: boolean = false;
  public soundsrc = [Sounds.EAT, Sounds.RUN];

  public runAnimation: Animation = {
    images: [
      "assets/img/rhino_run_left.png",
      "assets/img/rhino_run_left_2.png"
    ],
    speed: 150,
    repeat: true,
    running: false,
    start: () => {
      this.playSound(Sounds.RUN);
    },
    done: () => {
      this.stopSound(Sounds.RUN);
    }
  };

  public eatAnimation: Animation = {
    images: [
      "assets/img/rhino_lift.png",
      "assets/img/rhino_lift_mouth_open.png",
      "assets/img/rhino_lift_eat_1.png",
      "assets/img/rhino_lift_eat_2.png",
      "assets/img/rhino_lift_eat_3.png",
      "assets/img/rhino_lift_eat_4.png"
    ],
    speed: 450,
    repeat: false,
    running: false,
    start: () => {
      this.stopSound(Sounds.RUN);
      this.playSound(Sounds.EAT);
    },
    done: () => {
      this.stopSound(Sounds.EAT);
    }
  };

  public init = () => {
    this.assets.addSrc(this.eatAnimation.images, AssetType.Image, true);
    this.assets.addSrc(this.runAnimation.images, AssetType.Image, true);
    this.assets.addSrc([Sounds.EAT, Sounds.RUN], AssetType.Sound, true);
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
        setTimeout(() => {
          this.killPlayer();
          this.startAnimation("eat");
        }, 100);
      }
    } else if (!this.moving && !this.playerFound) {
      this.moving = true;
      this.startAnimation("run");
    }
  };

  /**
   * if you click on the rhino you get to restart the game
   * this is a test for mouse events
   */
  public onClick = event => {
    document.location.reload();
  };
}
