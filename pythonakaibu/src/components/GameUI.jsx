import 'beercss';
import './GameUI.css'
import React from 'react'
import HealthBar from './HealthBar';
import HealthBar2 from './HealthBar2';
import PowerupUI from './PowerupUI';

export default function GameUI() {
    const turnCount = 1;

    return (
        <>
            <div>
                <HealthBar />
                <HealthBar2 />
            </div>

            <div className='powerup-flex'>
                <PowerupUI />
                <PowerupUI />
            </div>

            <div className='turn-counter center'>
                <span style={{
                    textDecoration: "underline"
                }}>Turn</span>
                <span>{turnCount}</span>
            </div>  
        </>
    )
}
