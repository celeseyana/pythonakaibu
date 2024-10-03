import React from "react";
import './Tile.css';

const Tile = ({ row, col, handleClick, charasprite }) => {
    return (
        <div className="tile" onClick={() => handleClick(row, col)}>
            {charasprite && <div className="charasprite-container">{charasprite}</div>}
        </div>
    );
};

export default Tile;