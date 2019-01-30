import { SoundAsset } from "./assets/sound";
import { ImageAsset } from "./assets/image";
import { AnimationAsset } from "./assets/animation";
import * as _ from "lodash";
import { LoadableAsset } from "./assets/common";

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

interface LoadCallbacks {
  start: (total: number) => void;
  each: (left: number) => void;
  end: () => void;
}

interface AssetManagerInterface {
  add: (input: AssetInput, type: AssetType, autoload: boolean) => AssetManager;
  addSrcList: (
    list: Array<string | []>,
    type: AssetType,
    autoload: boolean
  ) => AssetManager;
  load: (
    id: string | string[],
    callbacks: LoadCallbacks
  ) => Promise<AssetManager>;
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
   * @returns {AssetManager}
   */
  public add = (
    input: AssetInput,
    type: AssetType,
    autoload: boolean = false
  ) => {
    switch (type) {
      case AssetType.Image: {
        this.assets[input.id] = new ImageAsset(input.id, input.src as string);
        break;
      }
      case AssetType.Animation: {
        this.assets[input.id] = new AnimationAsset(
          input.id,
          input.src as string[]
        );
        break;
      }
      case AssetType.Sound: {
        this.assets[input.id] = new SoundAsset(input.id, input.src as string);
        break;
      }
      default: {
        throw new Error("AssetType not supported");
      }
    }
    if (autoload) {
      this.load(input.id);
    }
    return this;
  };

  /**
   * adds an asset with id equal to src
   * @param {string | string[]} src
   * @param {AssetType} type
   * @param {boolean} autoload
   * @returns {AssetManager}
   */
  public addSrc = (
    src: string | string[],
    type: AssetType,
    autoload: boolean = false
  ) => {
    const s = _.isString(src) ? [src] : [...src];
    this.addSrcList(s, type, autoload);
    return this;
  };

  /**
   * loads an array of assets
   * @param {Array<string | []>} list
   * @param {AssetType} type
   * @param {boolean} autoload
   * @returns {AssetManager}
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
    return this;
  };

  /**
   * loads an asset or list of assets in to memory
   * @param {string | string[]} id
   * @param {LoadCallbacks} callbacks
   * @returns {Promise<AssetManager>}
   */
  public load = (
    id: string | string[],
    callbacks: LoadCallbacks = {
      start: (total: number) => null,
      each: (left: number) => null,
      end: () => null
    }
  ): Promise<AssetManager> => {
    return new Promise<AssetManager>((resolve, reject) => {
      if (_.isString(id)) {
        if (this.assets[id]) {
          callbacks.start(1);
          const p = this.assets[id].load();
          p.then(() => {
            callbacks.each(0);
            callbacks.end();
            resolve(this);
          });
        } else {
          throw new Error("Asset id: " + id + " not found.");
        }
      } else if (_.isArray(id)) {
        callbacks.start(id.length);
        let count = 0;
        const ps: Array<Promise<LoadableAsset<any>>> = [];
        id.forEach(i => {
          if (this.assets[i]) {
            const p = this.assets[i].load();
            p.then(() => {
              count++;
              callbacks.each(id.length - count);
            });
            ps.push(p);
          } else {
            throw new Error("Asset id: " + i + " not found.");
          }
        });
        Promise.all(ps)
          .then(() => {
            callbacks.end();
            resolve(this);
          })
          .catch(e => {
            reject(e);
          });
      }
    });
  };

  /**
   * Loads a group of assets that starts with a prefix
   * @param {string} prefix
   * @param {LoadCallbacks} callbacks
   * @returns {Promise<AssetManager>}
   */
  public loadStartsWith = (
    prefix: string,
    callbacks: LoadCallbacks = {
      start: (total: number) => null,
      each: (left: number) => null,
      end: () => null
    }
  ) => {
    const ids = _.keys(this.assets);
    const match = ids.filter(k => {
      return _.startsWith(k, prefix);
    });
    return this.load(match, callbacks);
  };

  /**
   * gets an asset class instance by id
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
