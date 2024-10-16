import React, { useState, useEffect } from 'react';
import 'beercss';
import './PowerupUI.css';
import Sprite from './SpriteReader';

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

export default function PowerupUI({collectedPowerups = []}) {
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

    return (
        <div className='powerup-gui'>
            <span className='active-text'>Active</span>
            <div className='sprites'>
                {collectedPowerups.includes('attack') && (
                    <div className='sprite-container'>
                        <Sprite frame={attackFrame} type="attack" />
                    </div>
                )}
                {collectedPowerups.includes('defense') && (
                    <div className='sprite-container'>
                        <Sprite frame={defenseFrame} type="defense" />
                    </div>
                )}
                {collectedPowerups.includes('movement') && (
                    <div className='sprite-container'>
                        <Sprite frame={speedFrame} type="movement" />
                    </div>
                )}
            </div>
        </div>
    );
}