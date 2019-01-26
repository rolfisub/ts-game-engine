import { MixinDecorator } from "ts-mixer";
import { Render } from "./game-object-children/render";
import { Sound } from "./game-object-children/sound";
import { Input } from "./game-object-children/input";
import { Behavior } from "./game-object-children/behavior";
import { Helper } from "./game-object-children/helper";
import { Physics } from "./game-object-children/physics";
import { Animated } from "./game-object-children/animated";

//trick typescript for intellisense
export interface GameObject
  extends Render,
    Sound,
    Input,
    Behavior,
    Helper,
    Physics,
    Animated {}
/**
 * we inherit from multiple classes
 * using a decorator
 */
@MixinDecorator(Render, Sound, Input, Behavior, Helper, Physics, Animated)
export class GameObject {
  public init = () => {
    if (this.imgsrc) {
      this.image = this.getImage(this.imgsrc[0]);
    }
  };
}
