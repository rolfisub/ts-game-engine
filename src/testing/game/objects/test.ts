import { GameObject } from "../../../engine/game-object";
import { AssetType } from "../../../engine/asset-manager";
import { ImageAsset } from "../../../engine/assets/image";
import { SoundAsset } from "../../../engine/assets/sound";

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

    /*this.assets.load("testImage").then(am => {
      this.image = am.get<ImageAsset>("testImage").get();
    });*/

    const image = this.assets.get<ImageAsset>("testImage");
    image.load().then(() => {
      this.image = image.get();
    });

    /**
     * sound testing
     */
    const sound = "assets/sounds/skiing.mp3";
    this.assets.addSrc(sound, AssetType.Sound);
    const s = this.assets.get<SoundAsset>(sound);
    s.load().then(() => {
      s.play();
      setTimeout(() => {
        s.stop();
        setTimeout(()=>{
          s.play()
        }, 1000)
      }, 1000);
    });
  };
}
