import { GameObject2D } from "../common/gameObject2D";
import { Directions2D } from "../common/common";

const test = new GameObject2D();

test.pos = {
  x: 50,
  y: 50
};
test.speed = 8;
test.direction = Directions2D.NONE;
test.img = new Image();
test.img.src = "img/skier_down.png";
test.width = test.img.width;
test.height = test.img.height;

export const testObj = test;
