import { GameObject } from "../../engine/gameObject";
import { Rhino } from "./rhino";

class RhinoGeneration extends GameObject {

}

const r = new Rhino();
r.pos = {
  x: 0,
  y: 0
};
r.addAnimation("run", r.runAnimation);
r.addAnimation("eat", r.eatAnimation);
