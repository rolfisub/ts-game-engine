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
  add: (input: AssetInput, type: AssetType, autoload: boolean) => void;
  addSrcList: (
    list: Array<string | []>,
    type: AssetType,
    autoload: boolean
  ) => void;
  load: (id: string | string[]) => void;
  get: <T>(id: string) => T;
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
        throw new Error("AssetType not supported");
      }
    }
    if (autoload) {
      this.load(input.id);
    }
    return;
  };

  /**
   * loads an array of assets
   * @param {Array<string | []>} list
   * @param {AssetType} type
   * @param {boolean} autoload
   */
  public addSrcList = (
    list: Array<string | []>,
    type: AssetType,
    autoload: boolean = false
  ) => {
    list.forEach(s => {
      if (_.isString(s)) {
        this.add(
          {
            id: s,
            src: s
          },
          type,
          autoload
        );
      } else if (_.isArray(s)) {
        s.forEach(ss => {
          this.add(
            {
              id: ss,
              src: ss
            },
            type,
            autoload
          );
        });
      }
    });
  };

  /**
   * loads an asset or list of assets in to memory
   * @param {string | string[]} id
   */
  public load = (id: string | string[]) => {
    if (_.isString(id)) {
      if (this.assets[id]) {
        this.assets[id].load();
      } else {
        throw new Error("Asset id: " + id + " not found.");
      }
    } else if (_.isArray(id)) {
      id.forEach(i => {
        if (this.assets[i]) {
          this.assets[i].load();
        } else {
          throw new Error("Asset id: " + i + " not found.");
        }
      });
    }
    return;
  };

  /**
   * gets ans asset class instance
   * @param {string} id
   * @returns {T}
   */
  public get = <T>(id: string) => {
    if (this.assets[id]) {
      return this.assets[id] as T;
    }
    throw new Error("Asset id: " + id + " not found.");
  };
}
