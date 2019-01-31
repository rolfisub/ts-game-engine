import { Model } from "./model";
import { SoundAsset } from "../assets/sound";

export class Sound extends Model {
  /**
   * plays a sound by src
   * @param src
   */
  public playSound = src => {
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
}
