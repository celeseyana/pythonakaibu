import 'beercss';
import './HealthBar.css'
import React from 'react'

const HealthBar = ({ maxHp = 100, hp, name } = {}) => {
    const barWidth = (hp / maxHp) * 100;

    return (
        <div className='health-bar-container absolute left top'>
            <span className='bar-name-1'>{name}</span>
            <div className="health-bar">
            <div className="bar" style={{ width: `${barWidth}%` }}></div>
            <div className="hit" style={{ width: `${0}%` }}></div>
                <div
                    style={{
                        position: "absolute",
                        color: "white",
                    }}
                    >
                    {hp} / {maxHp}
                </div>
            </div>

            <br />
        </div>
    );
};

export default HealthBar;
