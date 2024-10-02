import 'beercss';
import './GameUI.css'
import React from 'react'
import HealthBar from './HealthBar';
import HealthBar2 from './HealthBar2';

export default function GameUI() {
    return (
        <div>
            <HealthBar />
            <HealthBar2 />
        </div>
    )
}
