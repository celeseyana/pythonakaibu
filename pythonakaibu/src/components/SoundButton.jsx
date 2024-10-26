import { useState, useEffect } from 'react';
import 'beercss';
import './Home.css';

const SoundButton = ({soundOn, setSoundOn}) => {
    const handleClick = () => {
        setSoundOn(prevSoundOn => !prevSoundOn);
    };

    return (
        <img
            className='sound-btn'
            src={soundOn ? './src/assets/static_sound_on.png' : './src/assets/static_sound_off.png'}
            onMouseOut={e => e.currentTarget.src === soundOn ? "./src/assets/static_sound_on.png" : "./src/assets/static_sound_off.png"}
            onClick={handleClick}
        />
    );
};

export default SoundButton;
