import { Model } from "./model";
import { SoundAsset } from "../assets/sound";
import { ObjectStore } from "../common";
import * as _ from "lodash";

export class Sound extends Model {
  /**
   * keep track of which sounds are being played
   */
  protected soundStore: ObjectStore<string> = {};

  /**
   * plays a sound and stops the others
   * @param src
   * @param stopOthers
   */
  public playSound = (src: string, stopOthers: boolean = true) => {
    if (stopOthers) {
      this.stopOthers(src);
    }
    this.trackSrc(src);
    this.assets.get<SoundAsset>(src).play();
  };

  /**
   * pauses a sound by src
   * @param src
   */
  public pauseSound = src => {
    this.assets.get<SoundAsset>(src).pause();
  };

  /**
   * stops a sound by src
   * @param src
   */
  public stopSound = src => {
    this.assets.get<SoundAsset>(src).stop();
  };

  /**
   * tracks which srcs have been played or are playing
   * @param src
   */
  private trackSrc = src => {
    if (!this.soundStore[src]) {
      this.soundStore[src] = src;
    }
  };

  /**
   * stops any other sound playing
   * @param src
   */
  private stopOthers = src => {
    _.keys(this.soundStore)
      .filter(s => s !== src)
      .forEach(ss => this.stopSound(ss));
  };
}
