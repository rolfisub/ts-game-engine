import { GameObject } from "../../engine/gameObject";

export class Ramp extends GameObject {
  public id: string = "ramp";
  public imgsrc = ["assets/img/jump_ramp.png"];
  public renderPriority = 0;
  public width: number = 125;
  public height: number = 25;
}
