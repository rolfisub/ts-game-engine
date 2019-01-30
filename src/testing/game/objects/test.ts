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
    this.assets.add(
      { id: "testImage", src: "assets/img/jump_ramp.png" },
      AssetType.Image
    );

    this.assets.addSrcList(assetList, AssetType.Image);

    console.log(this.assets);

    this.assets.loadStartsWith("assets", {
      start: total => {
        console.log("total assets to load:" + total);
      },
      each: left => {
        console.log("total assets left to load:" + left);
      },
      end: () => {
        console.log("DONE");
      }
    });

    this.assets
      .load("testImage")
      .then(() => {
        this.image = this.assets.get<ImageAsset>("testImage").get();
      });
  };
}
