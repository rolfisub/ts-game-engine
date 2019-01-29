import { LoadableAsset } from "./common";

export class Image implements LoadableAsset<HTMLImageElement> {
  private instance: HTMLImageElement;
  constructor(public id: string, private src: string) {}

  public load = () => {
    this.instance = new HTMLImageElement();
    this.instance.src = this.src;
    this.instance.style.display = "none";
    document.body.appendChild(this.instance);
    return;
  };

  public get = (): HTMLImageElement => {
    return this.instance;
  };
}
