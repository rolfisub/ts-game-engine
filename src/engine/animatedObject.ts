import { GameObject } from "./gameObject";

export interface Animation {
  images: string[];
  timing: number;
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
        }, animation.timing);
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
