// @ts-nocheck
import PropTypes from "prop-types";
import Tile from "../models/Tile.ts";
import TileFactory from "../factory/TileFactory.ts";

function TileDisplay({ tile, handleClick }) {
  const show = tile.show ? "show" : "hide";

  return (
    <button type="button" className={`tile ${show}`} onClick={handleClick}>
      <div className={show}>
        {tile.letter}
        <div className={`score ${show}`}>{tile.score}</div>
      </div>
    </button>
  );
}

TileDisplay.propTypes = {
  tile: PropTypes.instanceOf(Tile),
  handleClick: PropTypes.func,
};

TileDisplay.defaultProps = {
  tile: TileFactory.createEmptyTile(),
  handleClick: {},
};

export default TileDisplay;
