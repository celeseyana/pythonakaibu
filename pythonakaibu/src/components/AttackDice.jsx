import React, { useState } from 'react';
import './Dice.css';

const AttackDice = ({ onAtkRoll }) => {
    const [attackDiceValue, setAttackDiceValue] = useState('');

    const handleRoll = (event) => {
        const value = event.target.value; // Get the input value
        const atkValue = parseInt(value, 10);
        if (!isNaN(atkValue) && atkValue > 0 && atkValue <= 6) {
            setAttackDiceValue(atkValue);
        }
    };

    const handleAtkSubmit = () => {
        if (attackDiceValue) {
            onAtkRoll(attackDiceValue);
            setAttackDiceValue(''); 
        }
    };

    return (
        <div className='dice-container'>
            <input
                type="number"
                value={attackDiceValue}
                onChange={handleRoll}
                min="1"
                max="6"
                placeholder="Roll!"
            />
            <img src='./src/assets/confirm.png' onClick={handleAtkSubmit}></img>
        </div>
    )
}

export default AttackDice;
// should be reusable across functions
