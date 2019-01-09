import { GameObject2D } from "../../engine/gameObject2D";
import { COMMON_KEY_CODES, Directions2D } from "../../engine/common";
import * as $ from "jquery";

enum IMAGES {
  UP = "img/skier_right.png",
  DOWN = "img/skier_down.png",
  LEFT = "img/skier_left.png",
  DOWN_LEFT = "img/skier_left_down.png",
  RIGHT = "img/skier_right.png",
  DOWN_RIGHT = "img/skier_right_down.png"
}

export class Player extends GameObject2D {
  public keyStates = {
    up: false,
    down: false,
    right: false,
    left: false
  };

  public keyDownHandle = event => {
    switch (event.keyCode) {
      case COMMON_KEY_CODES.ARROW_UP: {
        this.keyStates.up = true;
        break;
      }
      case COMMON_KEY_CODES.ARROW_DOWN: {
        this.keyStates.down = true;
        break;
      }
      case COMMON_KEY_CODES.ARROW_LEFT: {
        this.keyStates.left = true;
        break;
      }
      case COMMON_KEY_CODES.ARROW_RIGHT: {
        this.keyStates.right = true;
        break;
      }
      default: {
        // do nothing
      }
    }
  };

  public keyUpHandle = event => {
    switch (event.keyCode) {
      case COMMON_KEY_CODES.ARROW_UP: {
        this.keyStates.up = false;
        break;
      }
      case COMMON_KEY_CODES.ARROW_DOWN: {
        this.keyStates.down = false;
        break;
      }
      case COMMON_KEY_CODES.ARROW_LEFT: {
        this.keyStates.left = false;
        break;
      }
      case COMMON_KEY_CODES.ARROW_RIGHT: {
        this.keyStates.right = false;
        break;
      }
      default: {
        // do nothing
      }
    }
  };

  public setDirectionFromKeyStates = () => {
    if (this.keyStates.down) {
      this.direction = Directions2D.DOWN;
    }
    if (this.direction === Directions2D.DOWN) {
      if (this.keyStates.left) {
        this.direction = Directions2D.DOWN_LEFT;
      }
      if (this.keyStates.right) {
        this.direction = Directions2D.DOWN_RIGHT;
      }
    }
    if (
      this.direction === Directions2D.DOWN_RIGHT ||
      this.direction === Directions2D.DOWN_LEFT
    ) {
      if (this.keyStates.down) {
        this.direction = Directions2D.DOWN;
      }
    }
    if (this.direction === Directions2D.DOWN_RIGHT) {
      if (this.keyStates.left) {
        this.direction = Directions2D.DOWN;
      }
    }
    if (this.direction === Directions2D.DOWN_LEFT) {
      if (this.keyStates.right) {
        this.direction = Directions2D.DOWN;
      }
    }
    if (this.keyStates.up) {
      this.direction = Directions2D.NONE;
    }
    if (this.direction === Directions2D.NONE) {
      if (this.keyStates.left) {
        this.direction = Directions2D.LEFT;
      }
      if (this.keyStates.right) {
        this.direction = Directions2D.RIGHT;
      }
    }
    if (this.direction === Directions2D.LEFT) {
      if (!this.keyStates.left) {
        this.direction = Directions2D.NONE;
      }
    }
    if (this.direction === Directions2D.RIGHT) {
      if (!this.keyStates.right) {
        this.direction = Directions2D.NONE;
      }
    }
    if (this.direction === Directions2D.NONE) {
      if (this.keyStates.up) {
        this.direction = Directions2D.UP;
      }
    }
    if (this.direction === Directions2D.UP) {
      if (!this.keyStates.up) {
        this.direction = Directions2D.NONE;
      }
    }
  };

  public setImageFromDirection = () => {
    switch (this.direction) {
      case Directions2D.RIGHT: {
        this.updateImageTo(IMAGES.RIGHT);
        break;
      }
      case Directions2D.LEFT: {
        this.updateImageTo(IMAGES.LEFT);
        break;
      }
      case Directions2D.UP: {
        this.updateImageTo(IMAGES.UP);
        break;
      }
      case Directions2D.DOWN: {
        this.updateImageTo(IMAGES.DOWN);
        break;
      }
      case Directions2D.DOWN_LEFT: {
        this.updateImageTo(IMAGES.DOWN_LEFT);
        break;
      }
      case Directions2D.DOWN_RIGHT: {
        this.updateImageTo(IMAGES.DOWN_RIGHT);
        break;
      }
      default: {
        this.updateImageTo(IMAGES.RIGHT);
        break;
      }
    }
  };

  public moveBackground = () => {
    const bg = this.getObjectInstance("bg");
    if (bg) {
      const oppDir = this.getOppositeDirectionFrom(this.direction);
      bg.move(oppDir, this.speed);
    }
  };

  public update = () => {
    this.setDirectionFromKeyStates();
    this.setImageFromDirection();
    //we disable moving the player
    //this.move();
    this.moveBackground();
    //move obstacles

  };
}

const player = new Player();
//center screen
player.pos = {
  x: 572,
  y: 360
};
player.height = 50;
player.width = 50;
player.speed = 8;
player.direction = Directions2D.NONE;
player.imgsrc = [
  IMAGES.UP,
  IMAGES.DOWN,
  IMAGES.DOWN_RIGHT,
  IMAGES.DOWN_LEFT,
  IMAGES.LEFT,
  IMAGES.RIGHT
];
$(window).keydown(player.keyDownHandle);
$(window).keyup(player.keyUpHandle);

export const mp = player;
