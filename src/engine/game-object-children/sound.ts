import { Model } from "./model";

export class Sound extends Model {
  /**
   * sound store
   * @type {any[]}
   */
  public soundsrc: string[] = [];

  /**
   * game API to get sound
   */
  public getSound: (sound) => HTMLAudioElement | undefined;

  /**
   * plays a sound from the store
   * @param src
   */
  public playSound = src => {
    const s = this.getSound(src);
    if (s) {
      //only play if sound is not being played already
      if (!this.isSoundPlaying(s)) {
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

  /**
   * check if the sound is already playing
   * @param {HTMLAudioElement} s
   * @returns {boolean}
   */
  private isSoundPlaying = (s: HTMLAudioElement): boolean => {
    return s.duration > 0 && !s.paused;
  };
}
