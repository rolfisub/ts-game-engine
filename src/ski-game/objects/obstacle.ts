import { GameObject2D } from "../../engine/gameObject2D";

enum IMAGES {
  rock1 = "img/rock_1.png",
  rock2 = "img/rock_2.png",
  tree1 = "img/tree_1.png",
  tree2 = "img/tree_cluster.png"
}

export class Obstacle extends GameObject2D {
  public id: string = "obstacle";
  public imgsrc = [IMAGES.rock1, IMAGES.rock2, IMAGES.tree1, IMAGES.tree2];

  //disable default moving
  public update = () => {
    //do nothing
  };
}

export const obs1 = new Obstacle();

obs1.width = 50;
obs1.height = 50;

obs1.pos.x = 200;
obs1.pos.y = 200;
