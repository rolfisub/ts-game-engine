import { Model } from "./model";

export class Sound extends Model {
  public soundsrc: string[] = [];

  public getSound: (sound) => HTMLAudioElement | undefined;

  /**
   * plays a sound from the store
   * @param src
   */
  public playSound = src => {
    const s = this.getSound(src);
    if (s) {
      if (s.duration > 0 && !s.paused) {
        //do nothing
      } else {
        s.play();
      }
    }
  };

  /**
   * stops the sound and resets progress to beginning
   * @param src
   */
  public stopSound = src => {
    const s = this.getSound(src);
    if (s) {
      s.currentTime = 0;
      s.pause();
    }
  };

  /**
   * just pauses the sound where it is
   * @param src
   */
  public pauseSound = src => {
    const s = this.getSound(src);
    if (s) {
      s.pause();
    }
  };
}