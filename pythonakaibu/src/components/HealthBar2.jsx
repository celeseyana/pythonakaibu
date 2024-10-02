import 'beercss';
import './HealthBar2.css'
import React from 'react'

const HealthBar2 = ({ maxHp = 100, hp = 100 } = {}) => {
    const barWidth = (hp / maxHp) * 100;
    return (
        <div className='health-bar-container2 absolute right top'>
            <div className='bar-name-2'>
                Placeholder 2
            </div>
            <div className="health-bar2">
            <div className="bar2" style={{ width: `${barWidth}%` }}></div>
            <div className="hit2" style={{ width: `${0}%` }}></div>
                <div
                    className='bar-text-2'
                    style={{
                        position: "absolute",
                        right: "0px",
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

export default HealthBar2;
