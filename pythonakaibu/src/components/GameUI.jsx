import 'beercss';
import './GameUI.css'
import React from 'react'
import HealthBar from './HealthBar';
import HealthBar2 from './HealthBar2';
import PowerupUI from './PowerupUI';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameUI({ player1Hp, player2Hp, turnCount, username2, player1StockPowerup, player2StockPowerup, player1ActivePowerup, player2ActivePowerup }) {
    const [name, setName] = useState('');
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
                <HealthBar name={name} hp={player1Hp} />
                <HealthBar2 placeholderName={username2 || 'Placeholder 2'} hp2={player2Hp} />
            </div>

            <div className='powerup-flex'>
                <PowerupUI collectedPowerups={[player1ActivePowerup, player1StockPowerup]} />
                <PowerupUI collectedPowerups={[player2ActivePowerup, player2StockPowerup]} />
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
