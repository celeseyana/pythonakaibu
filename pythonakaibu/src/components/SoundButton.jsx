import { useState } from 'react';
import 'beercss';
import './Home.css';

const SoundButton = () => {
    const [soundOn, setSoundOn] = useState(true);

    const handleClick = () => {
        setSoundOn(!soundOn);
    };

    return (
        <img
            className='sound-btn'
            src={soundOn ? './src/assets/static_sound_on.png' : './src/assets/static_sound_off.png'}
            onMouseOver={e => (e.currentTarget.src = soundOn ? "./src/assets/hover_sound_on.png" : "./src/assets/hover_sound_off.png")}
            onMouseOut={e => (e.currentTarget.src = soundOn ? "./src/assets/static_sound_on.png" : "./src/assets/static_sound_off.png")}
            onClick={handleClick}
        />
    );
};

export default SoundButton;
