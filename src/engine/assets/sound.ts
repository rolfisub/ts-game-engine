import { LoadableAsset } from "./common";

export class SoundAsset implements LoadableAsset<HTMLAudioElement> {
  private instance: HTMLAudioElement;
  constructor(public id: string, private src: string) {}

  public load = () => {
    return new Promise<LoadableAsset<HTMLAudioElement>>((resolve, reject) => {
      if (!this.instance) {
        this.instance = new Audio();
        this.instance.addEventListener("canplaythrough", () => {
          resolve(this);
        });
        this.instance.onerror = e => {
          reject(e);
        };
        this.instance.src = this.src;
        this.instance.setAttribute("preload", "auto");
        this.instance.setAttribute("controls", "none");
        this.instance.style.display = "none";
        document.body.appendChild(this.instance);
        this.instance.load();
      } else {
        resolve(this);
      }
    });
  };

  public get = (): HTMLAudioElement => {
    return this.instance;
  };

  /**
   * plays the sound
   */
  public play = () => {
    if (this.instance) {
      if (!this.isPlaying()) {
        this.instance.play();
      }
    }
  };

  /**
   * stops and resets sound
   */
  public stop = () => {
    if (this.instance) {
      this.instance.currentTime = 0;
      this.instance.pause();
    }
  };

  /**
   * pauses sound
   */
  public pause = () => {
    if (this.instance) {
      this.instance.pause();
    }
  };

  /**
   * is sound playing
   * @returns {boolean}
   */
  private isPlaying = (): boolean => {
    if (this.instance) {
      return this.instance.currentTime > 0 && this.instance.paused;
    }
    return false;
  };
}
