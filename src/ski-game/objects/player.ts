import { COMMON_KEY_CODES, Directions2D, Vector2D } from "../../engine/common";
import * as $ from "jquery";
import { Animation } from "../../engine/game-object-children/animated";
import { GameObject } from "../../engine/game-object";
import { AssetType } from "../../engine/asset-manager";
import { ImageAsset } from "../../engine/assets/image";

enum IMAGES {
  UP = "assets/img/skier_right.png",
  DOWN = "assets/img/skier_down.png",
  LEFT = "assets/img/skier_left.png",
  DOWN_LEFT = "assets/img/skier_left_down.png",
  RIGHT = "assets/img/skier_right.png",
  DOWN_RIGHT = "assets/img/skier_right_down.png",
  CRASH = "assets/img/skier_crash.png",
  DEAD = ""
}

enum PlayerState {
  Standing,
  Moving,
  Jumping,
  Crashed,
  Dead
}

enum Sounds {
  CRASH = "assets/sounds/crash.mp3",
  MOVE = "assets/sounds/skiing.mp3",
  DIE = "assets/sounds/scream.mp3",
  JUMPING = "assets/sounds/wind.mp3"
}

export class Player extends GameObject {
  public id = "player";
  public pos: Vector2D = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
  public height = 50;
  public width = 50;
  public speed = 8;
  public direction: Directions2D = Directions2D.NONE;

  /**
   * keep track of keys pressed
   * @type object
   */
  public keyStates = {
    up: false,
    down: false,
    right: false,
    left: false
  };

  /**
   * is player alive?
   * @type {boolean}
   */
  public isAlive: boolean = true;

  /**
   * Current Player State
   * @type {PlayerState}
   */
  public playerState: PlayerState = PlayerState.Standing;

  /**
   * describes player jumping animation
   * @type {Animation}
   */
  public jumpingAnimation: Animation = {
    images: [
      "assets/img/skier_jump_1.png",
      "assets/img/skier_jump_2.png",
      "assets/img/skier_jump_3.png",
      "assets/img/skier_jump_4.png"
      // "img/skier_jump_5.png"
    ],
    speed: 500,
    repeat: false,
    running: false,
    start: () => {
      this.playerState = PlayerState.Jumping;
      this.direction = Directions2D.DOWN;
      this.solid = false;
      this.width = 65;
      this.height = 65;
      this.speed = 10;
      this.playSound(Sounds.JUMPING);
    },
    done: () => {
      this.playerState = PlayerState.Moving;
      this.direction = Directions2D.DOWN;
      this.solid = true;
      this.width = 50;
      this.height = 50;
      this.speed = 8;
      this.stopSound(Sounds.JUMPING);
    }
  };

  public init = () => {
    /**
     * load images
     */
    this.assets.addSrc(
      [
        IMAGES.CRASH,
        IMAGES.RIGHT,
        IMAGES.LEFT,
        IMAGES.DOWN,
        IMAGES.DOWN_LEFT,
        IMAGES.DOWN_RIGHT,
        IMAGES.UP
      ],
      AssetType.Image,
      true
    );

    /**
     * animations
     */
    this.assets.addSrc(this.jumpingAnimation.images, AssetType.Image, true);

    /**
     * load sounds
     */
    this.assets.addSrc(
      [Sounds.JUMPING, Sounds.DIE, Sounds.CRASH, Sounds.MOVE],
      AssetType.Sound,
      true
    );

    this.assets
      .get<ImageAsset>(IMAGES.UP)
      .load()
      .then(am => {
        this.image = am.get();
      });
  };

  /**
   * handle key down
   * @param event
   */
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

  /**
   * handle key up
   * @param event
   */
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

  /**
   * set direction of the player
   * based on current key states
   * TODO: Improve this method
   */
  public setDirectionFromKeyStates = () => {
    if (this.playerState === PlayerState.Jumping) {
      return;
    }
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

  /**
   * based on the direction of the player
   * change the image
   */
  public setImageFromDirection = () => {
    if (this.playerState === PlayerState.Jumping) {
      return;
    }
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
        // do nothing
        break;
      }
    }
  };

  /**
   * moves obstacles relative to the player
   */
  public moveObjectsInOppositeDirection = (objectId: string) => {
    const obs = this.getObjectsById(objectId);
    if (obs) {
      const oppDir = this.getOppositeDirectionFrom(this.direction);
      obs.forEach(o => {
        o.move(oppDir, this.speed);
      });
    }
  };

  /**
   * updates the player when a collision is detected
   */
  public updatePlayerOnCollisionWithObstacle = () => {
    if (this.isCollisionWith("obs")) {
      setTimeout(() => {
        this.direction = Directions2D.NONE;
        this.updateImageTo(IMAGES.CRASH);
        this.playSound(Sounds.CRASH);
      }, 150);
    }
  };

  /**
   * kills the player
   */
  public killPlayer = () => {
    this.isAlive = false;
    this.updateImageTo(IMAGES.DEAD);
    this.playerState = PlayerState.Dead;
    this.playSound(Sounds.DIE);
    this.stopCurrentAnimation();
  };

  /**
   * moves all objects around based on my direction
   */
  public moveWorldAroundMe = () => {
    //move obstacles
    this.moveObjectsInOppositeDirection("obs");
    //move rhino
    this.moveObjectsInOppositeDirection("rhino");
    //move ramps
    this.moveObjectsInOppositeDirection("ramp");
  };

  /**
   * switches between moving and standing
   */
  public updatePlayerState = () => {
    if (this.playerState !== PlayerState.Jumping && this.isAlive) {
      if (this.direction === Directions2D.NONE) {
        this.playerState = PlayerState.Standing;
      } else {
        this.playerState = PlayerState.Moving;
      }
    }
  };

  public jump = () => {
    if (
      this.isCollisionWith("ramp") &&
      this.playerState !== PlayerState.Jumping
    ) {
      this.startAnimation("jump");
    }
  };

  /**
   * update method
   */
  public update = () => {
    if (this.isAlive) {
      this.setDirectionFromKeyStates();
      this.setImageFromDirection();
      //check for collision
      this.updatePlayerOnCollisionWithObstacle();
      //move
      this.moveWorldAroundMe();
      //
      this.updatePlayerState();
      //
      this.jump();
      //
      this.playSounds();
    }
  };

  protected playSounds = () => {
    if (this.playerState === PlayerState.Moving) {
      this.playSound(Sounds.MOVE, true);
    } else {
      this.pauseSound(Sounds.MOVE);
    }
  };
}

export const player = new Player();

player.addAnimation("jump", player.jumpingAnimation);

$(window).keydown(player.keyDownHandle);
$(window).keyup(player.keyUpHandle);
