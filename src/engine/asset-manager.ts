export interface Asset {
  id: string;
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

export class AssetManager {
  private images: ImageStore = {};
  private animations: AnimationStore = {};
  private sounds: SoundStore = {};

}
