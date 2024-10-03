import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile"; 
import CharaSprite from "./CharaSpriteReader";
import './Board.css';

const unitSprites = {
    player1: {
        path: '../assets/p1chara.png',
        totalFrames: 5,
    },
    player2: {
        path: '../assets/p2chara.png',
        totalFrames: 4,
    },

};

const Board = () => {
    const [player1Frame, setPlayer1Frame] = useState(1);
    const [player2Frame, setPlayer2Frame] = useState(1);

    useEffect(() => {
        const player1Interval = setInterval(() => {
            setPlayer1Frame(prevFrame => (prevFrame % unitSprites.player1.totalFrames) + 1);
        }, 100);

        const player2Interval = setInterval(() => {
            setPlayer2Frame(prevFrame => (prevFrame % unitSprites.player2.totalFrames) + 1);
        }, 100);

        return () => {
            clearInterval(player1Interval);
            clearInterval(player2Interval);
        };
    }, []);

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
                let charasprite = null;
                if (row === 0 && col === 0) {
                    charasprite = <CharaSprite frame={player1Frame} type="player1" />;
                } else if (row === 7 && col === 6) {
                    charasprite = <CharaSprite frame={player2Frame} type="player2" />;
                }

                tileRow.push(
                    <Tile
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        handleClick={handleClick}
                        charasprite={charasprite} 
                    />
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