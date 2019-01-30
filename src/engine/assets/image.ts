import { LoadableAsset } from "./common";

export class ImageAsset implements LoadableAsset<HTMLImageElement> {
  private instance: HTMLImageElement;
  constructor(public id: string, private src: string) {}

  public load = () => {
    this.instance = new Image();
    this.instance.src = this.src;
    this.instance.style.display = "none";
    document.body.appendChild(this.instance);
    return this;
  };

  public get = (): HTMLImageElement => {
    return this.instance;
  };
}
