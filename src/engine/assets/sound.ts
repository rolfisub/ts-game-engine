import { LoadableAsset } from "./common";

export class SoundAsset implements LoadableAsset<HTMLAudioElement> {
  private instance: HTMLAudioElement;
  constructor(public id: string, private src: string) {}

  public load = () => {
    return new Promise<LoadableAsset<HTMLAudioElement>>((resolve, reject) => {
      if (!this.instance) {
        this.instance = new HTMLAudioElement();
        this.instance.onload = () => {
          resolve(this);
        };
        this.instance.onerror = e => {
          reject(e);
        };
        this.instance.src = this.src;
        this.instance.setAttribute("preload", "auto");
        this.instance.setAttribute("controls", "none");
        this.instance.style.display = "none";
        document.body.appendChild(this.instance);
      } else {
        resolve(this);
      }
    });
  };

  public get = (): HTMLAudioElement => {
    return this.instance;
  };
}
