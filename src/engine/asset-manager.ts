import { Sound } from "./assets/sound";
import { Image } from "./assets/image";
import { Animation } from "./assets/animation";
import * as _ from "lodash";

export enum AssetType {
  Image = "image",
  Animation = "animation",
  Sound = "sound"
}

export interface AssetInput {
  id: string;
  src: string | string[];
}

type AssetStore = {
  [key: string]: any;
};

interface AssetManagerInterface {
  add: (input: AssetInput, type: AssetType) => void;
  load: (id: string | string[]) => void;
  getSound: (id: string) => Sound;
  getImage: (id: string) => Image;
  getAnimation: (id: string) => Animation;
}

export class AssetManager implements AssetManagerInterface {
  /**
   * key value asset store
   * @type {{}}
   */
  private assets: AssetStore = {};

  /**
   * adds an asset to the store
   * @param {AssetInput} input
   * @param {AssetType} type
   * @param {boolean} autoload
   */
  public add = (
    input: AssetInput,
    type: AssetType,
    autoload: boolean = false
  ) => {
    switch (type) {
      case AssetType.Image: {
        this.assets[input.id] = new Image(input.id, input.src as string);
        break;
      }
      case AssetType.Animation: {
        this.assets[input.id] = new Animation(input.id, input.src as string[]);
        break;
      }
      case AssetType.Sound: {
        this.assets[input.id] = new Sound(input.id, input.src as string);
        break;
      }
      default: {
        throw new Error("Type not supported");
      }
    }
    if (autoload) {
      this.load(input.id);
    }
    return;
  };

  /**
   * loads an asset or list of assets in to memory
   * @param {string | string[]} id
   */
  public load = (id: string | string[]) => {
    if (_.isString(id)) {
      this.assets[id].load();
    } else if (_.isArray(id)) {
      id.forEach(i => this.assets[i].load());
    }
    return;
  };

  /**
   * gets a Sound class instance from store
   * @param {string} id
   * @returns {Sound}
   */
  public getSound = (id: string): Sound => {
    return this.assets[id];
  };

  /**
   * gets a Image class instance from store
   * @param {string} id
   * @returns {Image}
   */
  public getImage = (id: string): Image => {
    return this.assets[id];
  };

  /**
   * gets an animation from the store
   * @param {string} id
   * @returns {Animation}
   */
  public getAnimation = (id: string): Animation => {
    return this.assets[id];
  };
}
