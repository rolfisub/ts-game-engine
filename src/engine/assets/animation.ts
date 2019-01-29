import { LoadableAsset } from "./common";

export class Animation implements LoadableAsset<HTMLImageElement> {
  private instance: HTMLImageElement;
  private store: HTMLImageElement[];
  constructor(public id: string, private src: string[]) {}

  public load = () => {
    this.src.forEach(src => {
      const img = new HTMLImageElement();
      img.src = src;
      img.style.display = "none";
      document.body.appendChild(img);
      this.store.push(img);
    });
    return;
  };

  public get = (): HTMLImageElement => {
    return this.instance;
  };
}
