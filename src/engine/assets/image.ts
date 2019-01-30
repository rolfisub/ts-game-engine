import { LoadableAsset } from "./common";

export class ImageAsset implements LoadableAsset<HTMLImageElement> {
  private instance: HTMLImageElement;
  constructor(public id: string, private src: string) {}

  public load = () => {
    return new Promise<LoadableAsset<HTMLImageElement>>((resolve, reject) => {
      if (!this.instance) {
        this.instance = new Image();
        this.instance.onload = () => {
          resolve(this);
        };
        this.instance.onerror = e => {
          reject(e);
        };
        this.instance.src = this.src;
        this.instance.style.display = "none";
        document.body.appendChild(this.instance);
      } else {
        resolve(this);
      }
    });
  };

  public get = (): HTMLImageElement => {
    return this.instance;
  };
}
