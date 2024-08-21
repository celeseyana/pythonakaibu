import Navbar from './Navbar';
import Homebg from './Homebg';
import 'beercss';
import './Home.css'
import SoundButton from './SoundButton';
import { useState } from 'react';

export default function Home() {
    const [display, setDisplay] = useState('home');

    const displaySwitch = () => {
        switch (display) {
            case 'leaderboard':
                return (
                    <>
                        <h1>Leaderboard Page Test</h1>
                        <button className='back-btn' onClick={() => setDisplay('home')}>Back</button>
                    </>
                );
            case 'play':
                return (
                    <>
                        <h1>Play Page Tests</h1>
                        <button className='back-btn' onClick={() => setDisplay('home')}>Back</button>
                    </>
                );
            default:
                return (
                    <>
                    <button
                        className='ldb-btn green3 black-text absolute'
                        onClick={() => setDisplay('leaderboard')}
                    >
                        Leaderboards
                    </button>
                    
                    <div className='home-content'>
                        <img className='home-logo center' src='./src/assets/homelogo.png' alt="Home Logo"></img>
                        <img
                            className='play-btn center'
                            src="./src/assets/static_play.png"
                            onMouseOver={e => (e.currentTarget.src = "./src/assets/hover_play.png")}
                            onMouseOut={e => (e.currentTarget.src = "./src/assets/static_play.png")}
                            onClick={() => setDisplay('play')}
                            alt="Play Button"
                        />
                        </div>
                    </>
                );
        }
    }

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div>
                <Homebg />
            </div>

            <div className='parent-container'>
                <div className='absolute top right'>
                    <SoundButton />
                </div>
                {displaySwitch()}
            </div>
        </>
    )
}

