import { GameObject } from "../../../engine/game-object";
import { AssetType } from "../../../engine/asset-manager";

export class Test extends GameObject {
  public init = () => {
    this.getGameInstance().assets.add(
      { id: "testImage", src: "assets/img/jump_ramp.png" },
      AssetType.Image,
      true
    );

    console.log(this.getGameInstance().assets);
  };
}
