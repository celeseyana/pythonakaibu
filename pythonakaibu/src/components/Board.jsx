import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Tile from "./Tile"; 
import CharaSprite from "./CharaSpriteReader";
import Dice from "./Dice";
import AttackDice from "./AttackDice";
import DefenseDice from "./DefenseDice";
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

const Board = ({
    turnCount,
    setTurnCount,
    player1StockPowerup,
    player2StockPowerup,
    player1ActivePowerup,
    player2ActivePowerup,
    setPlayer1StockPowerup,
    setPlayer2StockPowerup,
    setPlayer1ActivePowerup,
    setPlayer2ActivePowerup,
    setPlayer1Hp,
    setPlayer2Hp }) => {
    const [player1Frame, setPlayer1Frame] = useState(1);
    const [player1Position, setPlayer1Position] = useState({ row: 0, col: 0 });

    const [player2Frame, setPlayer2Frame] = useState(1);
    const [player2Position, setPlayer2Position] = useState({ row: 7, col: 6 });

    const [currentTurn, setCurrentTurn] = useState('player1');

    const [diceRolled, setDiceRolled] = useState(false);
    const [remainingMoves, setRemainingMoves] = useState(0);
    const [movesCount, setMovesCount] = useState({ player1: 0, player2: 0 }); // Track moves count for each player

    const [coloredTiles, setColoredTiles] = useState([]);

    const [showQuestionPopup, setShowQuestionPopup] = useState(false); // ques handler
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedAns, setSelectedAns] = useState(""); // user's answer
    const [showAttackingPopup, setShowAttackingPopup] = useState(false); // attacking handler


    const [finalTileType, setFinalTileType] = useState(null); // check final landed on tile

    const powerupTypes = ['attack', 'defense', 'movement']; // HONESTLY THIS WAS BUGGED I HAVE NO IDEA HOW I FIXED IT PART 2
    const [showPowerupPopup, setShowPowerupPopup] = useState(false);
    const [popupPowerupType, setPopupPowerupType] = useState('');

    const [attackDmg, setAttackDmg] = useState(0);
    const [defenseAmt, setDefenseAmt] = useState(0);

    const [hasPlayer1Rolled, setHasPlayer1Rolled] = useState(false);
    const [hasPlayer2Rolled, setHasPlayer2Rolled] = useState(false);

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
            setPlayer1StockPowerup(powerup);
        } else {
            setPlayer2StockPowerup(powerup);
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
            setPlayer1ActivePowerup(player1StockPowerup);
            setPlayer1StockPowerup("");
            setPlayer2ActivePowerup(player2StockPowerup);
            setPlayer2StockPowerup("");
            setTurnCount(prevCount => prevCount + 1);
            console.log(`Turn Count: ${turnCount + 1}`);
        }

        setDiceRolled(false); 
        // console.log(currentTurn, 'Popup Type:', popupPowerupType);
    };

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

            setRemainingMoves(prevRemaining => prevRemaining - 1); //move setter

            if (remainingMoves - 1 === 0) {
                const landedTile = coloredTiles.find(tile => tile.tileKey === `${row}-${col}`);
                if (landedTile) {
                    const tileType = landedTile.type
                    console.log(`Landed on a ${tileType} tile.`);
                    setFinalTileType(tileType);

                    if (tileType === 'enemy') {
                        quizTest();
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

    const handleAttackRoll = (atkValue) => {
        setAttackDmg(atkValue);
        if (currentTurn === 'player1') {
            console.log("Player 1's Attack Damage: ", atkValue);
            setHasPlayer1Rolled(true);
            checkRollsComplete(true, hasPlayer2Rolled, atkValue, defenseAmt);
        } else {
            console.log("Player 2's Attack Damage: ", atkValue);
            setHasPlayer2Rolled(true);
            checkRollsComplete(hasPlayer1Rolled, true, atkValue, defenseAmt);
        }
    }

    const handleDefenseRoll = (defValue) => {
        setDefenseAmt(defValue);
        if (currentTurn === 'player1') {
            console.log("Player 2's Defense: ", defValue);
            setHasPlayer2Rolled(true);
            checkRollsComplete(hasPlayer1Rolled, true, attackDmg, defValue);
        } else {
            console.log("Player 1's Defense: ", defValue);
            setHasPlayer1Rolled(true);
            checkRollsComplete(true, hasPlayer2Rolled, attackDmg, defValue);
        }
    }

    const checkRollsComplete = (player1Rolled, player2Rolled, atkValue, defValue) => {
        // console.log(player1Rolled, player2Rolled);
        if (player1Rolled && player2Rolled) {
            handleDamageCalculation(atkValue, defValue);
            setShowAttackingPopup(false);
            swapTurns(); 
            resetRolls(); 
        }
    };

    const handleDamageCalculation = (atkValue, defValue) => {
        let dmgTaken = atkValue - defValue;
        // if (dmgTaken > 0) {
        //     console.log('Damage Dealt: ', dmgTaken);
        //     currentTurn === 'player1' ? setPlayer2Hp(prevHp => prevHp - dmgTaken) : setPlayer1Hp(prevHp => prevHp - dmgTaken);
        // } else {
        //     console.log("Successfully Defended");
        // }
        console.log(player1ActivePowerup, player2ActivePowerup);

        if (currentTurn === 'player1') {
            if (player1ActivePowerup === 'attack' && player2ActivePowerup !== "defense") {
                dmgTaken = dmgTaken * 2;
            } else if (player1ActivePowerup !== "attack" && player2ActivePowerup === "defense") {
                dmgTaken = Math.ceil(dmgTaken / 2);
            }

            if (dmgTaken > 0) {
                setPlayer2Hp(prevHp => Math.max(prevHp - dmgTaken, 0));
                console.log("Player 2 takes damage: ", dmgTaken);
            } else {
                console.log("Player 2 successfully defended!");
            }
        } else {
            if (player2ActivePowerup === 'attack' && player1ActivePowerup !== "defense") {
                dmgTaken = dmgTaken * 2;
            } else if (player2ActivePowerup !== "attack" && player1ActivePowerup === "defense") {
                dmgTaken = Math.ceil(dmgTaken / 2);
            }

            if (dmgTaken > 0) {
                setPlayer1Hp(prevHp => Math.max(prevHp - dmgTaken, 0)); 
                console.log("Player 1 takes damage: ", dmgTaken);
            } else {
                console.log("Player 1 successfully defended!");
            }
        }
    };

    const resetRolls = () => {
        setHasPlayer1Rolled(false);
        setHasPlayer2Rolled(false);
        setAttackDmg(0);
        setDefenseAmt(0);
    };

    const handleDiceRoll = (value) => {
        setDiceRolled(true);
        // powerup handlers and purely for powerups only
        if (currentTurn === 'player1' && player1ActivePowerup === 'movement') {
            setRemainingMoves(value + 3);
        }
        else if (currentTurn === 'player2' && player2ActivePowerup === 'movement') {
            setRemainingMoves(value + 3);
        } else {
            setRemainingMoves(value);
        }
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

    const quizTest = async () => {
        const response = await axios.get('http://localhost:8081/api/quizdata');
        setQuestion(response.data);
        setLoading(false);
        console.log(response.data);
    }

    const ansSelection = (ans) => {
        setSelectedAns(ans);
        console.log("Selected Answer: ", ans);

        if (ans === question.correct_ans) {
            console.log("ure correct vro");
            console.log(currentTurn);
            setShowQuestionPopup(false);
            setShowAttackingPopup(true);
        } else {
            console.log("ah hell naur bro fumbled");
            setShowQuestionPopup(false);  
            swapTurns();
        }
    }

    return (
        <div className="game-container"> 
            <div className="board">
                {renderTiles()}
            </div>
            <div className="dice-container absolute center">
                <Dice onRoll={handleDiceRoll} />
            </div>

            {/* <button onClick={quizTest}>test btn</button> */}

            {showQuestionPopup && ( // add the enemy thing here
                <div className="enemy-popup-overlay">
                    <div className="enemy-popup-box">
                        <h3>Attacking Chance!</h3>
                        <p>{question.ques_text}</p>
                        {/* <button onClick={ansSelection}></button> */}
                        <div className="mcq-box">
                            {question?.poss_ans?.map((ans, index) => (
                                <button onClick={() => ansSelection(ans)} key={index}>{ans}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showAttackingPopup && ( // add the attack procs thing here
                <div className="attacking-popup-overlay">
                    <div className="attacking-popup-box">
                        <div className="attacking-sprites">
                            <div className="rolled-amt-containers">
                                <span className="roll-text">Player 1 Rolled:</span>
                                <span className="dice-roll-text">0</span>
                            </div>


                            <div className="player-dice">
                                {currentTurn === 'player1' ? (
                                    <>
                                        <AttackDice onAtkRoll={handleAttackRoll} />
                                    </>
                                ) : (
                                    <>
                                        <DefenseDice onDefRoll={handleDefenseRoll} />
                                    </>
                                )}
                                <CharaSprite frame={player1Frame} type="player1" />
                            </div>

                            <div className="player-dice">
                                {currentTurn === 'player2' ? (
                                    <>
                                        <AttackDice onAtkRoll={handleAttackRoll} />
                                    </>
                                ) : (
                                    <>
                                        <DefenseDice onDefRoll={handleDefenseRoll} />
                                    </>
                                )}
                                <CharaSprite frame={player2Frame} type="player2" />
                            </div>


                            <div className="rolled-amt-containers">
                                <span className="roll-text">Player 2 Rolled:</span>
                                <span className="dice-roll-text">0</span>
                            </div>
                        </div>    
                        {/* <button onClick={() => {
                            setShowAttackingPopup(false);  
                            swapTurns();          
                        }}>Close</button> */}
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

