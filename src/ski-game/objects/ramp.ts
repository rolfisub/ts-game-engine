import { GameObject } from "../../engine/game-object";
import { AssetType } from "../../engine/asset-manager";
import { ImageAsset } from "../../engine/assets/image";

export class Ramp extends GameObject {
  public id: string = "ramp";
  public imgsrc = ["assets/img/jump_ramp.png"];
  public renderPriority = 0;
  public width: number = 125;
  public height: number = 25;

  public init = () => {
    this.assets.addSrc(this.imgsrc, AssetType.Image);
    this.assets.load(this.imgsrc[0]).then(() => {
      this.image = this.assets.get<ImageAsset>(this.imgsrc[0]).get();
    });
  };
}
