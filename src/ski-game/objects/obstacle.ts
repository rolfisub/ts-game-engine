import { GameObject } from "../../engine/game-object";

export enum ObstacleIMAGES {
  rock1 = "assets/img/rock_1.png",
  rock2 = "assets/img/rock_2.png",
  tree1 = "assets/img/tree_1.png",
  tree2 = "assets/img/tree_cluster.png"
}

export class Obstacle extends GameObject {
  public id: string = "obs";
  public width: number = 25;
  public height: number = 25;

  public imgsrc = [
    ObstacleIMAGES.tree1,
    ObstacleIMAGES.rock2,
    ObstacleIMAGES.tree2,
    ObstacleIMAGES.rock1
  ];

  public init = () => {
    //do nothing
  };

  //disable default moving
  public update = () => {
    //do nothing
  };
}
