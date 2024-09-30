import React from "react";
import Tile from "./Tile"; // Assuming Tile is your hexagon component
import './Board.css';

const Board = () => {
    const rows = 8; 
  
    const handleClick = (row, col) => {
        console.log(`Tile clicked at row: ${row}, col: ${col}`);
    };

    const renderTiles = () => {
        const tiles = [];
        for (let row = 0; row < rows; row++) {
            const tileRow = [];
            const cols = row % 2 === 0 ? 8 : 7;
            
            for (let col = 0; col < cols; col++) {
                tileRow.push(
                    <Tile key={`${row}-${col}`} row={row} col={col} handleClick={handleClick} />
                );
            }
            tiles.push(
                <div key={row} className={`tile-row ${row % 2 === 0 ? "even-row" : "odd-row"}`}>
                    {tileRow}
                </div>
            );
        }
        return tiles;
    };

    return <div className="board">{renderTiles()}</div>;
};

export default Board;