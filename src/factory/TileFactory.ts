// @ts-nocheck
import Tile from "../models/Tile.ts";
import WordUtil from "../utils/WordUtil.ts";

class TileFactory {
  static createTileFromLetter(
    letter: string,
    index: number,
    show: boolean = true,
  ) {
    const tile = new Tile();
    tile.letter = letter;
    tile.show = show;
    tile.score = WordUtil.getScoreFromLetter(letter);
    tile.originIndex = index;
    return tile;
  }

  static createEmptyTile() {
    return this.createTileFromLetter(" ", 0, false);
  }
}

export default TileFactory;
