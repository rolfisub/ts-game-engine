import { GameObject2D } from "../common/gameObject2D";
import { Directions2D } from "../common/common";

const test = new GameObject2D();

test.pos = {
  x: 50,
  y: 50
};
test.speed = 8;
test.direction = Directions2D.NONE;
test.imgsrc = "img/skier_down.png";
test.width = 25;
test.height = 25;

export const testObj = test;
