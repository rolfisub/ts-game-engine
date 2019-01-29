import { Sound } from "./assets/sound";
import { Image } from "./assets/image";
import { Animation } from "./assets/animation";

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
   */
  public add = (input: AssetInput, type: AssetType) => {
    return;
  };

  /**
   * loads an asset or list of assets in to memory
   * @param {string | string[]} id
   */
  public load = (id: string | string[]) => {
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
