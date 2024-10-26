import React, { useState } from 'react';
import './Dice.css';

const DefenseDice = ({ onDefRoll }) => {
    const [defenseDiceValue, setDefenseDiceValue] = useState('');

    const handleRoll = (event) => {
        const value = event.target.value; // Get the input value
        const defValue = parseInt(value, 10);
        if (!isNaN(defValue) && defValue > 0 && defValue <= 6) { 
            setDefenseDiceValue(defValue);
        }
    };

    const handleDefSubmit = () => {
        if (defenseDiceValue) {
            onDefRoll(defenseDiceValue);
            setDefenseDiceValue(''); 
        }
    };

    return (
        <div className='dice-container'>
            <input
                type="number"
                value={defenseDiceValue}
                onChange={handleRoll}
                min="1"
                max="6"
                placeholder="Roll!"
            />
            <img src='./src/assets/confirm.png' onClick={handleDefSubmit}></img>
        </div>
    )
}

export default DefenseDice;
// should be reusable across functions
