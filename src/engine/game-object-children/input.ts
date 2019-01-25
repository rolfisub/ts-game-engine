import { Model } from "./model";

export class Input extends Model {
  /**
   * function to handle click event
   * @param event
   */
  public onClick = event => {
    //by default do nothing
  };

  public onKeyPress = event => {
    //by default do nothing
  };

  public onKeyDown = event => {
    //by default do nothing
  };

  public onKeyUp = event => {
    //by default do nothing
  }
}
