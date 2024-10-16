import React from "react";
import { useState, useEffect } from "react";
import Tile from "./Tile"; 
import CharaSprite from "./CharaSpriteReader";
import Dice from "./Dice";
import Sprite from "./SpriteReader";
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

const spritesheets = {
    attack: {
        path: '../assets/atk_buff.png',
        totalFrames: 7,
    },
    defense: {
        path: '../assets/defense_buff.png',
        totalFrames: 4,
    },
    movement: { // HONESTLY THIS WAS BUGGED I HAVE NO IDEA HOW I FIXED IT PART 1
        path: '../assets/movement_buff.png',
        totalFrames: 9,
    },
};

const Board = ({ turnCount, setTurnCount, setPlayer1Powerups, setPlayer2Powerups }) => {
    const [player1Frame, setPlayer1Frame] = useState(1);
    const [player1Position, setPlayer1Position] = useState({ row: 0, col: 0 });

    const [player2Frame, setPlayer2Frame] = useState(1);
    const [player2Position, setPlayer2Position] = useState({ row: 7, col: 6 });

    const [currentTurn, setCurrentTurn] = useState('player1');

    const [diceRolled, setDiceRolled] = useState(false);
    const [diceValue, setDiceValue] = useState(0);
    const [remainingMoves, setRemainingMoves] = useState(0);
    const [movesCount, setMovesCount] = useState({ player1: 0, player2: 0 }); // Track moves count for each player

    const [coloredTiles, setColoredTiles] = useState([]);

    const [showQuestionPopup, setShowQuestionPopup] = useState(false); // ques handler
    const [finalTileType, setFinalTileType] = useState(null); // check final landed on tile

    const powerupTypes = ['attack', 'defense', 'movement']; // HONESTLY THIS WAS BUGGED I HAVE NO IDEA HOW I FIXED IT PART 2
    const [showPowerupPopup, setShowPowerupPopup] = useState(false);
    const [popupPowerupType, setPopupPowerupType] = useState('');

    const [frame, setFrame] = useState(1); // State for the sprite frame

    useEffect(() => {
        let frameInterval;

        if (showPowerupPopup) {
            frameInterval = setInterval(() => {
                setFrame(prevFrame => (prevFrame % spritesheets[popupPowerupType].totalFrames) + 1);
            }, 100); 
        }

        return () => {
            clearInterval(frameInterval);
        };
    }, [showPowerupPopup, popupPowerupType]); 

    const setCollectedPowerups = (player, powerup) => {
        if (player === 'player1') {
            setPlayer1Powerups(prev => [...prev, powerup]);
        } else {
            setPlayer2Powerups(prev => [...prev, powerup]);
        }
    };

    const handlePowerupPopup = (show, powerupType = '') => {
        setShowPowerupPopup(show);
        setPopupPowerupType(powerupType);
    };

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

    useEffect(() => {
        generateColoredTiles();
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

    const generateColoredTiles = () => {
        const enemyCount = 25; // fixed vals
        const powerupCount = 10; // fixed vals

        const occupiedTiles = [
            `${player1Position.row}-${player1Position.col}`,
            `${player2Position.row}-${player2Position.col}`
        ];

        const allTiles = new Set();

        const availableTiles = [];

        for (let row = 0; row < rows; row++) {
            const cols = row % 2 === 0 ? 8 : 7;
            for (let col = 0; col < cols; col++) {
                const tileKey = `${row}-${col}`;
                if (!occupiedTiles.includes(tileKey)) {
                    availableTiles.push(tileKey);
                }
            }
        }

        for (let i = availableTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableTiles[i], availableTiles[j]] = [availableTiles[j], availableTiles[i]];
        }

        for (let i = 0; i < enemyCount; i++) {
            const tileKey = availableTiles[i];
            allTiles.add({ tileKey, type: 'enemy' });
        }

        for (let i = enemyCount; i < enemyCount + powerupCount; i++) {
            const tileKey = availableTiles[i];
            allTiles.add({ tileKey, type: 'powerup' });
        }

        setColoredTiles(Array.from(allTiles));
    };

    const swapTurns = () => {
        setCurrentTurn(currentTurn === 'player1' ? 'player2' : 'player1');
        if (currentTurn === 'player2') {
            setTurnCount(prevCount => prevCount + 1);
            console.log(`Turn Count: ${turnCount + 1}`);
        }
        setDiceRolled(false); 
        setDiceValue(0);
        setRemainingMoves(0);
        console.log(currentTurn, 'Popup Type:', popupPowerupType);
    };

    // const swapTurns = () => {
    //     setCurrentTurn(currentTurn === 'player1' ? 'player2' : 'player1');
    //     console.log("Player 1 has:", player1Powerups);
    //     console.log("Player 2 has:", player2Powerups);

    //     if (currentTurn === 'player2') {
    //         setTurnCount(prevCount => {
    //             const newTurnCount = prevCount + 1;

    //             if (prevCount % 3 !== 0 && newTurnCount % 3 === 0) {
    //                 setPlayer1Powerups(player1Powerups => {
    //                     if (player1Powerups.length > 0) {
    //                         console.log("Removing from player1Powerups:", player1Powerups);
    //                         return player1Powerups.slice(1); 
    //                     }
    //                     return player1Powerups;
    //                 });

    //                 setPlayer2Powerups(player2Powerups => {
    //                     if (player2Powerups.length > 0) {
    //                         console.log("Removing from player2Powerups:", player2Powerups);
    //                         return player2Powerups.slice(1); 
    //                     }
    //                     return player2Powerups; 
    //                 });
    //             }

    //             console.log(`Turn Count: ${newTurnCount}`);
    //             return newTurnCount;
    //         });
    //     }

    //     setDiceRolled(false); 
    //     setDiceValue(0);
    //     setRemainingMoves(0);
    //     console.log(currentTurn, 'Popup Type:', popupPowerupType);
    // };

    const handleClick = (row, col) => {
        if (!diceRolled) {
            console.log("Roll the dice!");
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
                const landedTile = coloredTiles.find(tile => tile.tileKey === `${row}-${col}`);
                if (landedTile) {
                    const tileType = landedTile.type
                    console.log(`Landed on a ${tileType} tile.`);
                    setFinalTileType(tileType);

                    if (tileType === 'enemy') {
                        setShowQuestionPopup(true);
                    } else if (tileType === 'powerup') {
                        const randomPowerup = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
                        setCollectedPowerups(currentTurn, randomPowerup);
                        handlePowerupPopup(true, randomPowerup);
                    }
                    else {
                        swapTurns();
                    }
                } else {
                    swapTurns();
                };
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

                const coloredTile = coloredTiles.find(tile => tile.tileKey === `${row}-${col}`);
                const tileColor = coloredTile ? (coloredTile.type === 'enemy' ? 'skyblue' : 'purple') : 'lightgreen';

                tileRow.push(
                    <Tile
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        handleClick={handleClick}
                        charasprite={charasprite} 
                        color={tileColor}
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

            {showQuestionPopup && (
                <div className="enemy-popup-overlay">
                    <div className="enemy-popup-box">
                        <h3>Enemy Encounter!</h3>
                        <p>You encountered an enemy!</p>
                        <button onClick={() => {
                            setShowQuestionPopup(false);  
                            swapTurns();          
                        }}>Close</button>
                    </div>
                </div>
            )}

            {showPowerupPopup && (
                <div className="powerup-popup-overlay">
                    <div className="powerup-popup-box absolute center">
                        <h3>Power-up Found!</h3>
                        <p>You found a {popupPowerupType} power-up!</p>
                        <div className="powerup-popup-sprite-container">
                            <Sprite className='powerup-popup-sprite' frame={frame} type={popupPowerupType} />
                        </div>
                        <button onClick={() => {
                            setShowPowerupPopup(false);  
                            swapTurns(); 
                        }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Board;