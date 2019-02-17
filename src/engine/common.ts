export interface Vector2D {
  x: number;
  y: number;
}

export enum Directions2D {
  UP = 1,
  DOWN,
  LEFT,
  RIGHT,
  UP_RIGHT,
  UP_LEFT,
  DOWN_RIGHT,
  DOWN_LEFT,
  NONE
}

export enum COMMON_KEY_CODES {
  ARROW_UP = 38,
  ARROW_DOWN = 40,
  ARROW_LEFT = 37,
  ARROW_RIGHT = 39
}

export type ObjectStore<T> = {
  [key: string]: T;
};
