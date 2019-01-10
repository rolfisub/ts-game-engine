import { GameObject2D } from "../engine/gameObject2D";

class Background extends GameObject2D {
  public repeat: boolean = false;

  /**
   * override default draw method
   * to account for drawing alternatives
   */
  public render = (ctx: CanvasRenderingContext2D) => {
    if (ctx && this.image) {
      if (this.repeat) {
        const areaW: number =
          this.pos.x < 0
            ? Math.abs(this.pos.x) + this.width
            : this.width - this.pos.x;
        const areaH =
          this.pos.y < 0
            ? Math.abs(this.pos.y) + this.height
            : this.height - this.pos.y;
        const xAmount = Math.ceil(areaW / (this.image.width as number)).valueOf();
        const yAmount = Math.ceil(areaH / (this.image.height as number)).valueOf();
        let startX = this.pos.x;
        let startY = this.pos.y;
        for (let y = 1; y <= yAmount; y++) {
          for (let x = 1; x <= xAmount; x++) {
            console.log(y, yAmount);
            console.log(x, xAmount);
            /*ctx.drawImage(
              this.image,
              0,
              0,
              this.image.width as number,
              this.image.height as number,
              startX,
              startY,
              this.image.width as number,
              this.image.height as number
            );*/

            startX = x * (this.image.width as number);
          }
          startY = y * (this.image.height as number);
        }
      }
    }
  };
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
  bg1 = "img/snowbg.png"
}

background.pos.y = 0;
background.pos.x = 0;
background.imgsrc = [IMAGES.bg1];
background.width = 500;
background.height = 500;
background.repeat = true;
background.id = "bg";

export const bg = background;
