// @ts-nocheck
class Tile {
  originIndex: number | undefined;

  letter: string | undefined;

  score: number | undefined;

  show: boolean | undefined;

  static readonly EMPTY_TILE_LETTER = " ";

  static readonly EMPTY_TILE_SCORE = 0;

  static readonly EMPTY_TILE_INDEX = 0;
}

export default Tile;
