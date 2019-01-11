import { AnimatedObject } from "../../engine/animatedObject";

enum IMAGES {
  run1 = "img/rhino_run_left.png",
  run2 = "img/rhino_run_left_2.png",
  eat1 = "img/rhino_lift.png",
  eat2 = "img/rhino_lift_mouth_open.png",
  eat3 = "img/rhino_lift_eat_1.png",
  eat4 = "img/rhino_lift_eat_2.png",
  eat5 = "img/rhino_lift_eat_3.png",
  eat6 = "img/rhino_lift_eat_4.png"
}

class Test extends AnimatedObject {
  public update = () => {
    this.startAnimation("test2");
  };
}

export const testAnimation = new Test();

testAnimation.pos = {
  x: 200,
  y: 200
};

testAnimation.addAnimation("test", {
  images: [IMAGES.run1, IMAGES.run2],
  speed: 150,
  repeat: true,
  running: false
});

testAnimation.addAnimation("test2", {
  images: [
    IMAGES.eat1,
    IMAGES.eat2,
    IMAGES.eat3,
    IMAGES.eat4,
    IMAGES.eat5,
    IMAGES.eat6
  ],
  speed: 450,
  repeat: false,
  running: false
});

setTimeout(() => {
  console.log("stopping animation");
  testAnimation.stopCurrentAnimation();
}, 10000);
