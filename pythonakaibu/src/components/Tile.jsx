import React from "react";
import './Tile.css';

const Tile = ({ row, col, handleClick }) => {
  return (
    <div
      className="tile"
      onClick={() => handleClick(row, col)}
    >
    </div>
  );
};

export default Tile;