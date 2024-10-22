import React, { useState } from 'react';
import './Dice.css';

const Dice = ({ onRoll }) => {
    const [diceValue, setDiceValue] = useState('');

    const handleRoll = (event) => {
        const value = parseInt(event.target.value, 10)
        if (!isNaN(value) && value > 0 && value <= 6) { 
            setDiceValue(value);
        }
    };

    const handleSubmit = () => {
        if (diceValue) {
            onRoll(diceValue);
            setDiceValue(''); 
        }
    };

    return (
        <div className='dice-container'>
            <input
                type="number"
                value={diceValue}
                onChange={handleRoll}
                min="1"
                max="6"
                placeholder="Roll!"
            />
            <img src='./src/assets/confirm.png' onClick={handleSubmit}></img>
        </div>
    )
}

export default Dice;
// should be reusable across functions
