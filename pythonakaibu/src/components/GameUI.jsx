import 'beercss';
import './GameUI.css'
import React from 'react'
import HealthBar from './HealthBar';
import HealthBar2 from './HealthBar2';
import PowerupUI from './PowerupUI';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameUI({ turnCount, username2, player1Powerups, player2Powerups }) {
    const [name, setName] = useState('');
    // console.log("Player 1 has:", player1Powerups);
    // console.log("Player 2 has:", player2Powerups);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            setName(res.data.name);
        })
    }, []);

    return (
        <>
            <div>
                <HealthBar name={name} />
                <HealthBar2 placeholderName={username2 || 'Placeholder 2'} />
            </div>

            <div className='powerup-flex'>
                <PowerupUI collectedPowerups={player1Powerups} />
                <PowerupUI collectedPowerups={player2Powerups} />
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
