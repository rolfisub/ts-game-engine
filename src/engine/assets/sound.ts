import { LoadableAsset } from "./common";

export class SoundAsset implements LoadableAsset<HTMLAudioElement> {
  private instance: HTMLAudioElement;
  constructor(public id: string, private src: string) {}

  public load = () => {
    this.instance = new HTMLAudioElement();
    this.instance.src = this.src;
    this.instance.setAttribute("preload", "auto");
    this.instance.setAttribute("controls", "none");
    this.instance.style.display = "none";
    document.body.appendChild(this.instance);
    return;
  };

  public get = (): HTMLAudioElement => {
    return this.instance;
  };
}
