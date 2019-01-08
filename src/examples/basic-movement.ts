import { GameObject2D } from "../common/gameObject2D";
import { COMMON_KEY_CODES, Directions2D } from "../common/common";
import * as $ from "jquery";

enum IMAGES {
  DOWN = "img/skier_down.png",
  RIGHT = "img/skier_right.png",
  LEFT = "img/skier_left.png"
}

export class BasicMovement extends GameObject2D {
  public keyDownHandler = event => {
    switch (event.keyCode) {
      case COMMON_KEY_CODES.ARROW_UP: {
        this.direction = Directions2D.UP;
        break;
      }
      case COMMON_KEY_CODES.ARROW_DOWN: {
        this.direction = Directions2D.DOWN;
        break;
      }
      case COMMON_KEY_CODES.ARROW_LEFT: {
        this.direction = Directions2D.LEFT;
        break;
      }
      case COMMON_KEY_CODES.ARROW_RIGHT: {
        this.direction = Directions2D.RIGHT;
        break;
      }
      default: {
        //do nothing
      }
    }
  };

  public keyUpHandler = event => {
    this.direction = Directions2D.NONE;
  };

  public update = () => {
    switch (this.direction) {
      case Directions2D.LEFT: {
        this.updateImageTo(IMAGES.LEFT);
        break;
      }
      case Directions2D.RIGHT: {
        this.updateImageTo(IMAGES.RIGHT);
        break;
      }
      case Directions2D.DOWN: {
        this.updateImageTo(IMAGES.DOWN);
        break;
      }
      default:{
        //
      }
    }
    this.move();
  };
}

const player = new BasicMovement();
player.pos = {
  x: 200,
  y: 200
};
player.height = 50;
player.width = 50;
player.speed = 8;
player.direction = Directions2D.NONE;
player.imgsrc = [
  IMAGES.DOWN,
  IMAGES.LEFT,
  IMAGES.RIGHT
];

$(window).keydown(player.keyDownHandler);
$(window).keyup(player.keyUpHandler);

export const myPlayer = player;
