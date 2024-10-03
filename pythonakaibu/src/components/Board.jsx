import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile"; 
import CharaSprite from "./CharaSpriteReader";
import Dice from "./Dice";
import './Board.css';
import 'beercss';

const unitSprites = {
    player1: {
        path: '../assets/p1chara.png',
        totalFrames: 5,
    },
    player2: {
        path: '../assets/p2chara.png',
        totalFrames: 5,
    },

};

const Board = () => {
    const [player1Frame, setPlayer1Frame] = useState(1);
    const [player1Position, setPlayer1Position] = useState({ row: 0, col: 0 });

    const [player2Frame, setPlayer2Frame] = useState(1);
    const [player2Position, setPlayer2Position] = useState({ row: 7, col: 6 });

    const [currentTurn, setCurrentTurn] = useState('player1');

    const [diceRolled, setDiceRolled] = useState(false);
    const [diceValue, setDiceValue] = useState(0);
    const [remainingMoves, setRemainingMoves] = useState(0);
    const [movesCount, setMovesCount] = useState({ player1: 0, player2: 0 }); // Track moves count for each player

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
  
    const hexNeighbors = (row, col) => {
        const neighbors = [
            { row: row - 1, col: col }, // Up
            { row: row + 1, col: col }, // Down
            { row: row, col: col - 1 }, // Left
            { row: row, col: col + 1 }, // Right
            { row: row - 1, col: col + 1 }, // Upper Right (for even rows)
            { row: row + 1, col: col + 1 }, // Lower Right (for odd rows)
            { row: row - 1, col: col - 1 }, // Upper Left (for odd rows)
            { row: row + 1, col: col - 1 }, // Lower Left (for even rows)
        ];
        return neighbors;
        // explanation : the player can move adjacently as long as the tiles are connected
        // if this was a squarish grid, the player should be able to move up down left right
        // but this is a hexagonal grid: so this block is just to make it so that the player
        // can move adjacently (in a hexagonal way(?)) if that makes sense
    };

    const handleClick = (row, col) => {
        if (!diceRolled) {
            console.log("Roll the dice first to select a tile.");
            return;
        }

        const currentPosition = currentTurn === 'player1' ? player1Position : player2Position;

        const validMoves = hexNeighbors(currentPosition.row, currentPosition.col);
        const isValidMove = validMoves.some(pos => pos.row === row && pos.col === col);

        if (
            (currentTurn === 'player1' && row === player2Position.row && col === player2Position.col) ||
            (currentTurn === 'player2' && row === player1Position.row && col === player1Position.col)
        ) {
            console.log("You cannot move to a tile occupied by the other player.");
            return; // collision check
        }

        if (isValidMove) {
            if (currentTurn === 'player1') {
                setPlayer1Position({ row, col });
                setMovesCount(prevCount => ({ ...prevCount, player1: prevCount.player1 + 1 }));
                console.log(`Player 1 moves: ${movesCount.player1 + 1}`);
            } else {
                setPlayer2Position({ row, col });
                setMovesCount(prevCount => ({ ...prevCount, player2: prevCount.player2 + 1 }));
                console.log(`Player 2 moves: ${movesCount.player2 + 1}`);
            }

            setRemainingMoves(prevRemaining => prevRemaining - 1);

            if (remainingMoves - 1 === 0) {
                console.log(`${currentTurn} has completed their move!`);
                setCurrentTurn(currentTurn === 'player1' ? 'player2' : 'player1');
                setDiceRolled(false); 
                setDiceValue(0); 
                setRemainingMoves(0); 
            }
        } else {
            console.log("You can only move to connected tiles.");
        }
    };

    const handleDiceRoll = (value) => {
        setDiceValue(value);
        setDiceRolled(true); 
        setRemainingMoves(value); 
        console.log(`${currentTurn} rolled a ${value}`);
    };

    const renderTiles = () => {
        const tiles = [];
        for (let row = 0; row < rows; row++) {
            const tileRow = [];
            const cols = row % 2 === 0 ? 8 : 7;
            
            for (let col = 0; col < cols; col++) {
                let charasprite = null;

                if (row === player1Position.row && col === player1Position.col) {
                    charasprite = <CharaSprite frame={player1Frame} type="player1" />;
                }

                if (row === player2Position.row && col === player2Position.col) {
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

    return (
        <div className="game-container"> 
            <div className="board">
                {renderTiles()}
            </div>
            <div className="dice-container absolute center">
                <Dice onRoll={handleDiceRoll} />
            </div>
        </div>
    )
};

export default Board;