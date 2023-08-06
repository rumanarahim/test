// @ts-nocheck
import TileFactory from "./TileFactory.ts";
import WordUtil from "../utils/WordUtil.ts";

class TileRackFactory {
  static readonly MAX_NUMBER_OF_TILES = 7;

  static createTileRackFromRandomString() {
    const tileRack = [];
    const randomString = WordUtil.generateRandomString(
      this.MAX_NUMBER_OF_TILES,
    );
    [...randomString].forEach((letter, index) => {
      const tile = TileFactory.createTileFromLetter(letter, index + 1);
      tileRack.push(tile);
    });
    return tileRack;
  }

  static createEmptyTileRack() {
    const tileRack = [];
    for (let i = 0; i < this.MAX_NUMBER_OF_TILES; i += 1) {
      const tile = TileFactory.createEmptyTile();
      tileRack.push(tile);
    }

    return tileRack;
  }
}

export default TileRackFactory;
