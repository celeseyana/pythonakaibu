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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const spritesheets = {
    attack: {
        path: '../assets/atk_buff.png',
        totalFrames: 7,
    },
    defense: {
        path: '../assets/defense_buff.png',
        totalFrames: 4,
    },
    speed: {
        path: '../assets/movement_buff.png',
        totalFrames: 9,
    },
};

export default function Map1() {
    const navigate = useNavigate(); 

    const backtoHome = () => {
        navigate('/'); 
    };
    // const [atkTooltip, setAtkTooltip] = useState("Attack Buff Tooltip");
    // const [defTooltip, setDefTooltip] = useState("Defense Buff Tooltip");
    // const [spdTooltip, setSpdTooltip] = useState("Speed Buff Tooltip");

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
            setSpeedFrame(prevFrame => (prevFrame % spritesheets.speed.totalFrames) + 1);
        }, 100);

        return () => {
            clearInterval(attackInterval);
            clearInterval(defenseInterval);
            clearInterval(speedInterval);
        };
    }, []);

    return (
        <>
            <div>
                <GameUI />
            </div>

            <div>
                <Gamebg />
            </div>
            
            <div className="board-container">
                <Board />
                <img
                    className='faq-hover absolute bottom right'
                    src='./src/assets/powerup_faq.png'
                    style={{
                        width: "32px",
                        height: "32px",
                        zIndex: "6"
                    }}
                >
                </img>

                <img
                    className='quit-game absolute bottom left'
                    src='./src/assets/quit.png'
                    style={{
                        width: "32px",
                        height: "32px",
                        zIndex: "6"
                    }}
                    // onClick={backtoHome}
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
            
        </>
    );
}

