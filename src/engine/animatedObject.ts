import { GameObject } from "./gameObject";

export interface Animation {
  images: string[];
  speed: number;
  repeat: boolean;
  running: boolean;
}

type AnimationStore = {
  [key: string]: Animation;
};

export class AnimatedObject extends GameObject {
  /**
   * animations store
   * @type {{}}
   */
  protected animations: AnimationStore = {};
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
        this.animationInterval = setInterval(() => {
          animation.running = true;
          if (index >= animation.images.length) {
            if (animation.repeat) {
              index = 0;
            } else {
              clearInterval(this.animationInterval);
              return;
            }
          }
          this.updateImageTo(animation.images[index]);
          index++;
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
      a.images.forEach(i => {
        this.imgsrc.push(i);
      });
    }
  };
}
