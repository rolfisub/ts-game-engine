import { GameObject } from "../../../engine/game-object";
import { AssetType } from "../../../engine/asset-manager";
import { ImageAsset } from "../../../engine/assets/image";

const assetList = [
  "assets/img/rhino_lift_eat_1.png",
  "assets/img/rhino_lift_eat_2.png",
  "assets/img/rhino_lift_eat_3.png",
  "assets/img/rhino_lift_eat_4.png"
];

export class Test extends GameObject {
  public init = () => {
    this.getGameInstance().assets.add(
      { id: "testImage", src: "assets/img/jump_ramp.png" },
      AssetType.Image,
      true
    );

    this.getGameInstance().assets.addSrcList(assetList, AssetType.Image, true);

    console.log(this.getGameInstance().assets);

    this.image = this.getGameInstance()
      .assets.get<ImageAsset>("testImage")
      .get();
  };
}
