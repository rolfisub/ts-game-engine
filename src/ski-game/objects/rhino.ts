import { AnimatedObject, Animation } from "../../engine/animatedObject";

export class Rhino extends AnimatedObject {
  public id: string = "rhino";
  public width: number = 100;
  public height: number = 100;
  public speed: number = 20;

  protected runAnimation: Animation = {
    images: ["img/rhino_run_left.png", "img/rhino_run_left_2.png"],
    speed: 150,
    repeat: true,
    running: false
  };

  protected eatAnimation: Animation = {
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

  public init = () => {
    this.addAnimation("run", this.runAnimation);
    this.addAnimation("eat", this.eatAnimation);
  };

  public moveToPlayer = () => {
    this.startAnimation("run");
    const player = this.getObjectInstance("player");

  };

  public update = () => {
    this.moveToPlayer();
  };
}
