import { LoadableAsset } from "./common";

export class Image implements LoadableAsset<CanvasImageSource> {
  private instance: CanvasImageSource;
  constructor(public id: string) {}

  public load = () => {
    return;
  };

  public get = (): CanvasImageSource => {
    return this.instance;
  };
}
