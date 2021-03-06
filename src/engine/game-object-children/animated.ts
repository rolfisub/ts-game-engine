import { Render } from "./render";
import { ObjectStore } from "../common";

export interface Animation {
  images: string[];
  speed: number;
  repeat: boolean;
  running: boolean;
  start?: () => void;
  done?: () => void;
}

export class Animated extends Render {
  /**
   * animations store
   * @type {{}}
   */
  protected animations: ObjectStore<Animation> = {};
  protected animationInterval: number;
  protected animationKey: string;

  /**
   * starts an animation by name
   * @param {string} key
   */
  public startAnimation = (key: string) => {
    if (this.animationKey !== key) {
      this.stopCurrentAnimation();
    }
    const animation = this.animations[key];
    if (animation) {
      if (!animation.running) {
        let index = 0;
        this.animationKey = key;
        this.updateImageTo(animation.images[index]);
        if (animation.start) {
          animation.start();
        }
        this.animationInterval = setInterval(() => {
          index++;
          animation.running = true;
          if (index >= animation.images.length) {
            if (animation.repeat) {
              index = 0;
            } else {
              if (animation.done) {
                animation.done();
              }
              clearInterval(this.animationInterval);
              animation.running = false;
              return;
            }
          }
          this.updateImageTo(animation.images[index]);
        }, animation.speed);
      }
    }
  };

  /**
   * stops the current animation process
   */
  public stopCurrentAnimation = () => {
    clearInterval(this.animationInterval);
  };

  /**
   * adds an animation to the game object
   * @param {string} key
   * @param {Animation} a
   */
  public addAnimation = (key: string, a: Animation) => {
    if (a) {
      this.animations[key] = a;
    }
  };
}
