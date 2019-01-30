import { MixinDecorator } from "ts-mixer";
import { Model } from "./game-object-children/model";
import { Render } from "./game-object-children/render";
import { Sound } from "./game-object-children/sound";
import { Input } from "./game-object-children/input";
import { Behavior } from "./game-object-children/behavior";
import { Helper } from "./game-object-children/helper";
import { Physics } from "./game-object-children/physics";
import { Animated } from "./game-object-children/animated";
import { ImageAsset } from "./assets/image";

//trick typescript for intellisense
export interface GameObject
  extends Model,
    Render,
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
    if (this.imgsrc && this.assets) {
      //by default we expect to load an image that has the same id as the game object
      const asset = this.assets.get<ImageAsset>(this.id);
      asset.load().then(() => {
        this.image = asset.get();
      });
    }
  };
}
