import React from "react";
import './Tile.css';

const Tile = ({ row, col, handleClick, charasprite, color }) => {
    return (
        <div className="tile" onClick={() => handleClick(row, col)} style={{ backgroundColor: color }}>
            {charasprite && <div className="charasprite-container">{charasprite}</div>}
        </div>
    );
};

export default Tile;