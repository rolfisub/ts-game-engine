import { LoadableAsset } from "./common";

export class AnimationAsset implements LoadableAsset<HTMLImageElement> {
  private instance: HTMLImageElement;
  private store: HTMLImageElement[];
  constructor(public id: string, private src: string[]) {}

  public load = () => {
    this.src.forEach(src => {
      const img = new Image();
      img.src = src;
      img.style.display = "none";
      document.body.appendChild(img);
      this.store.push(img);
    });
    return this;
  };

  public get = (): HTMLImageElement => {
    return this.instance;
  };
}
