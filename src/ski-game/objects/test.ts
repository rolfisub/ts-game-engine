import { AnimatedObject } from "../../engine/animatedObject";

enum IMAGES {
  run1 = "img/rhino_run_left.png",
  run2 = "img/rhino_run_left_2.png"
}

class Test extends AnimatedObject {
  public update = () => {
    this.startAnimation("test");
  };
}

export const testAnimation = new Test();

testAnimation.pos = {
  x: 200,
  y: 200
};

testAnimation.addAnimation("test", {
  images: [IMAGES.run1, IMAGES.run2],
  timing: 150,
  repeat: true,
  running: false
});
