enum AssetType {
  Image = "image",
  Animation = "animation",
  Sound = "sound"
}

export interface Asset {
  id: string;
  type: AssetType;
}

export interface Image extends Asset {
  src: string;
  instance?: CanvasImageSource;
}

export interface Animation extends Asset {
  src: string[];
  speed: number;
  repeat: boolean;
  start?: () => void;
  each?: () => void;
  end?: () => void;
  instance?: CanvasImageSource[];
}

export interface Sound extends Asset {
  src: string;
  volume: string;
  repeat: boolean;
  instance?: HTMLAudioElement;
}

type ImageStore = {
  [key: string]: Image;
};

type AnimationStore = {
  [key: string]: Animation;
};

type SoundStore = {
  [key: string]: Sound;
};

type AssetInput = Image | Animation | Sound;

export class AssetManager {
  private images: ImageStore = {};
  private animations: AnimationStore = {};
  private sounds: SoundStore = {};

  /**
   * adds an asset to its store
   * @param {AssetInput} asset
   */
  public addAsset = (asset: AssetInput) => {
    switch (asset.type) {
      case AssetType.Image:
        this.images[asset.id] = asset as Image;
        break;
      case AssetType.Animation:
        this.animations[asset.id] = asset as Animation;
        break;
      case AssetType.Sound:
        this.sounds[asset.id] = asset as Sound;
        break;
      default:
        throw new Error("Incorrect Asset Type");
    }
  };

}
