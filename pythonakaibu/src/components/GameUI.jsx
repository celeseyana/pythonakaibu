import 'beercss';
import './GameUI.css'
import React from 'react'
import HealthBar from './HealthBar';
import HealthBar2 from './HealthBar2';
import PowerupUI from './PowerupUI';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameUI({ turnCount, username2 }) {
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
                <HealthBar name={name} />
                <HealthBar2 placeholderName={username2 || 'Placeholder 2'} />
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
