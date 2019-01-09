import { GameObject2D } from "../../engine/gameObject2D";

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

background.pos.y = -5000;
background.pos.x = -5000;
background.imgsrc = [IMAGES.bg1];
background.width = 10000;
background.height = 10000;
background.id = "bg";

export const bg = background;
