import React, { useState } from 'react';
import './P2Popup.css'; 

const P2Popup = ({ onUsername2Submit }) => {
    const [username2, setUsername2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username2.trim()) {
            onUsername2Submit(username2); 
        }
    };

    return (
        <div className="p2overlay">
            <div className="popup">
                <h2>Player 2's Name?</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username2}
                        onChange={(e) => setUsername2(e.target.value)}
                        required
                    />
                    <button type="submit" className='green'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default P2Popup;