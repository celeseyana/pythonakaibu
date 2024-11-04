import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sprite from './SpriteReader';
import { Tooltip } from 'react-tooltip'
import './Map1.css';
import './PowerupUI.css'
import 'beercss';
import Board from './Board';  
import Gamebg from './GameBG';
import GameUI from './GameUI';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import P2Popup from './P2Popup';

const spritesheets = {
    attack: {
        path: '../assets/atk_buff.png',
        totalFrames: 7,
    },
    defense: {
        path: '../assets/defense_buff.png',
        totalFrames: 4,
    },
    movement: {
        path: '../assets/movement_buff.png',
        totalFrames: 9,
    },
};

export default function Map1() {
    const navigate = useNavigate(); 

    const backtoHome = () => {
        navigate('/'); 
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const [attackFrame, setAttackFrame] = useState(1);
    const [defenseFrame, setDefenseFrame] = useState(1);
    const [speedFrame, setSpeedFrame] = useState(1);

    useEffect(() => {
        const attackInterval = setInterval(() => {
            setAttackFrame(prevFrame => (prevFrame % spritesheets.attack.totalFrames) + 1);
        }, 100);

        const defenseInterval = setInterval(() => {
            setDefenseFrame(prevFrame => (prevFrame % spritesheets.defense.totalFrames) + 1);
        }, 100);

        const speedInterval = setInterval(() => {
            setSpeedFrame(prevFrame => (prevFrame % spritesheets.movement.totalFrames) + 1);
        }, 100);

        return () => {
            clearInterval(attackInterval);
            clearInterval(defenseInterval);
            clearInterval(speedInterval);
        };
    }, []);

    const [username2, setUsername2] = useState('');
    const [showPopup, setShowPopup] = useState(true); 

    const handleUsername2Submit = (name) => {
        setUsername2(name);
        setShowPopup(false); // Hide the popup after submission
    };

    const [turnCount, setTurnCount] = useState(1); 
    const [player1Hp, setPlayer1Hp] = useState(100);
    const [player2Hp, setPlayer2Hp] = useState(100); 

    const [player1StockPowerup, setPlayer1StockPowerup] = useState("");
    const [player2StockPowerup, setPlayer2StockPowerup] = useState("");
    const [player1ActivePowerup, setPlayer1ActivePowerup] = useState("");
    const [player2ActivePowerup, setPlayer2ActivePowerup] = useState("");

    return (
        <>
            {showPopup && <P2Popup onUsername2Submit={handleUsername2Submit} />}

            <div>
                <GameUI
                    player1Hp={player1Hp}
                    player2Hp={player2Hp}
                    turnCount={turnCount}
                    setTurnCount={setTurnCount}
                    username2={username2}
                    player1StockPowerup={player1StockPowerup}
                    player2StockPowerup={player2StockPowerup}
                    player1ActivePowerup={player1ActivePowerup}
                    player2ActivePowerup={player2ActivePowerup}
                />
            </div>

            <div>
                <Gamebg />
            </div>
            
            <div className="board-container">
                <Board
                    player1Hp={player1Hp}
                    player2Hp={player2Hp}
                    setPlayer1Hp={setPlayer1Hp}
                    setPlayer2Hp={setPlayer2Hp}
                    turnCount={turnCount}
                    setTurnCount={setTurnCount}
                    player1StockPowerup={player1StockPowerup}
                    player2StockPowerup={player2StockPowerup}
                    player1ActivePowerup={player1ActivePowerup}
                    player2ActivePowerup={player2ActivePowerup}
                    setPlayer1StockPowerup={setPlayer1StockPowerup}
                    setPlayer2StockPowerup={setPlayer2StockPowerup}
                    setPlayer1ActivePowerup={setPlayer1ActivePowerup}
                    setPlayer2ActivePowerup={setPlayer2ActivePowerup}
                /> 
                <img
                    className='faq-hover absolute bottom right'
                    src='./src/assets/powerup_faq.png'
                    style={{
                        width: "32px",
                        height: "32px",
                        zIndex: "6",
                        margin: "20px"
                    }}
                >
                </img>

                <Tooltip className='zaTooltip' anchorSelect=".faq-hover" place="top" effect="solid">
                    {/* this was hard coded to hell but if it works it works :) */}
                    <div className='sprites'>
                        <span className='white-text' style={{textDecoration: "underline", fontSize: "large"}}>Powerups</span>
                        <div className='sprite-container'>
                            <Sprite frame={attackFrame} type="attack" />
                            <span style={{
                                // MORE HARD CODE
                                marginLeft: "90px"
                            }}>
                                Raging Skeletal System: Doubles your attack for the next turn.
                            </span>
                        </div>
                        <div className='sprite-container def-sprite'>
                            <Sprite frame={defenseFrame} type="defense" />
                            <span style={{
                                marginLeft: "70px"
                            }}>
                                Great Nature: Halves damage taken in the next turn.
                            </span>
                        </div>
                        <div className='sprite-container'>
                            <Sprite frame={speedFrame} type="movement" />
                            <span style={{
                                marginLeft: "40px"
                            }}>
                                Wind Turbine: Increases amount of times you can move by 3 during your next turn.
                            </span>
                        </div>
                    </div>
                </Tooltip>
            </div>

                <ClickAwayListener onClickAway={handleClickAway}>
                    <div>
                        <img
                            className='quit-game absolute bottom left'
                            src='./src/assets/quit.png'
                            style={{
                                width: "32px",
                                height: "32px",
                                zIndex: "6",
                                margin: "20px"
                        }}
                        onClick={handleClick}
                        >
                        </img>
                        {open ? (
                            <div className='quit-popup absolute center'>
                                <span className='white-text'>Are you sure you want to quit the game?</span>
                                <div className='yes-no-quit'>
                                    <img onClick={handleClickAway} src='./src/assets/quit.png'></img>
                                    <img onClick={backtoHome} src='./src/assets/confirm.png'></img>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </ClickAwayListener>
            
        </>
    );
}


