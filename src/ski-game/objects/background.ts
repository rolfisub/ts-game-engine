import { GameObject2D } from "../../common/gameObject2D";

class Background extends GameObject2D {
  /**
   * we disable the default movement
   * this will be handled somewhere else
   */
  public update = () => {
    //do nothing
  };
}

const background = new Background();

enum IMAGES {
  bg1 = "img/bgredcircuit.jpg"
}

background.pos.y = 0;
background.pos.x = 0;
background.imgsrc = [IMAGES.bg1];
background.width = 1500;
background.height = 1500;
background.id = "bg";

export const bg = background;
