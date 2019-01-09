import { GameObject2D } from "../../../engine/gameObject2D";
import { Directions2D } from "../../../engine/common";

const test = new GameObject2D();

test.pos = {
  x: 50,
  y: 50
};
test.speed = 8;
test.direction = Directions2D.NONE;
test.imgsrc = "img/skier_down.png";
test.width = 50;
test.height = 50;

export const testObj = test;

const test2 = new GameObject2D();

test2.pos = {
  x: 100,
  y: 50
};
test2.speed = 8;
test2.direction = Directions2D.NONE;
test2.imgsrc = "img/rhino_default.png";
test2.width = 100;
test2.height = 100;

export const testObj2 = test2;