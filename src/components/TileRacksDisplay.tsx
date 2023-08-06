// @ts-nocheck
import PropTypes from "prop-types";
import Tile from "../models/Tile.ts";
import TileDisplay from "./TileDisplay.tsx";
import TileFactory from "../factory/TileFactory.ts";

function TileRacksDisplay({
  originTileRack,
  setOriginTileRack,
  stagingTileRack,
  setStagingTileRack,
}) {
  const addTileToStagingTileRack = (originTile) => {
    let inserted = false;
    return stagingTileRack.map((stagingTile) => {
      if (stagingTile.letter === Tile.EMPTY_TILE_LETTER && !inserted) {
        inserted = true;
        return TileFactory.createTileFromLetter(
          originTile.letter,
          originTile.originIndex,
        );
      }
      return stagingTile;
    });
  };

  const removeTileFromStagingTileRack = (originTile) => {
    const newStagingTileRack = stagingTileRack.reduce((result, stagingTile) => {
      if (stagingTile.originIndex !== originTile.originIndex) {
        result.push(stagingTile);
      }
      return result;
    }, []);

    newStagingTileRack.push(TileFactory.createEmptyTile());
    return newStagingTileRack;
  };

  const toggleTileVisibilityInOriginTileRack = (originTile) => {
    const newOriginTileRack = [...originTileRack];
    newOriginTileRack[originTile.originIndex - 1].show =
      !newOriginTileRack[originTile.originIndex - 1].show;
    return newOriginTileRack;
  };

  const handleOriginTileClick = (originTile) => {
    if (originTile.show) {
      setStagingTileRack(addTileToStagingTileRack(originTile));
    } else {
      setStagingTileRack(removeTileFromStagingTileRack(originTile));
    }

    setOriginTileRack(toggleTileVisibilityInOriginTileRack(originTile));
  };

  const handleStagingTileClick = (tile) => {
    if (tile.originIndex === Tile.EMPTY_TILE_INDEX) {
      return;
    }
    setStagingTileRack(removeTileFromStagingTileRack(tile));
    setOriginTileRack(toggleTileVisibilityInOriginTileRack(tile));
  };

  return (
    <div className="justify-self-center">
      <table className="table-fixed border-white border-separate border border-spacing-5 m-auto">
        <tbody>
          <tr className="border">
            {originTileRack.map((tile, index) => (
              <td key={`origin-${index}-${tile.originIndex}-${tile.letter}`}>
                <TileDisplay
                  tile={tile}
                  handleClick={() => handleOriginTileClick(tile)}
                />
              </td>
            ))}
          </tr>
          <tr className="border">
            {stagingTileRack.map((tile, index) => (
              <td key={`staging-${index}-${tile.originIndex}-${tile.letter}`}>
                <TileDisplay
                  tile={tile}
                  handleClick={() => handleStagingTileClick(tile)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

TileRacksDisplay.propTypes = {
  originTileRack: PropTypes.arrayOf(PropTypes.instanceOf(Tile)),
  setOriginTileRack: PropTypes.func,
  stagingTileRack: PropTypes.arrayOf(PropTypes.instanceOf(Tile)),
  setStagingTileRack: PropTypes.func,
};

TileRacksDisplay.defaultProps = {
  originTileRack: [],
  setOriginTileRack: {},
  stagingTileRack: [],
  setStagingTileRack: {},
};

export default TileRacksDisplay;
