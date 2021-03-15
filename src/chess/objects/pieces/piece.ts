// generic piece object

export enum PieceType {
  None,
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King
}

export enum PieceColor {
  None,
  White,
  Black
}

export class Piece {
  protected type: PieceType = PieceType.None;
  protected color: PieceColor = PieceColor.None;
  protected name: string = "";
}
