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
  public animations: AnimationStore = {};
  public animationInterval: number;
  public animationKey: string;

  public startAnimation = (key: string) => {
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

  public stopCurrentAnimation = () => {
    clearInterval(this.animationInterval);

  };

  public addAnimation = (key: string, a: Animation) => {
    if (a) {
      this.animations[key] = a;
      a.images.forEach(i => {
        this.imgsrc.push(i);
      });
    }
  };
}
