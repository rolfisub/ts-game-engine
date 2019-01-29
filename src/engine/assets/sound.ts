import { LoadableAsset } from "./common";

export class Sound implements LoadableAsset<HTMLAudioElement> {
  private instance: HTMLAudioElement;
  constructor(public id: string) {}

  public load = () => {
    return;
  };

  public get = (): HTMLAudioElement => {
    return this.instance;
  };
}
