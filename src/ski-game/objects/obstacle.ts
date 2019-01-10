import { GameObject } from "../../engine/gameObject";

export enum ObstacleIMAGES {
  rock1 = "img/rock_1.png",
  rock2 = "img/rock_2.png",
  tree1 = "img/tree_1.png",
  tree2 = "img/tree_cluster.png"
}

export class Obstacle extends GameObject {
  public id: string = "obs";
  public imgsrc = [
    ObstacleIMAGES.rock1,
    ObstacleIMAGES.rock2,
    ObstacleIMAGES.tree1,
    ObstacleIMAGES.tree2
  ];
  public width: number = 25;
  public height: number = 25;

  //disable default moving
  public update = () => {
    //do nothing
  };
}
