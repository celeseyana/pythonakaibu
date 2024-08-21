import Navbar from './Navbar';
import Homebg from './Homebg';
import 'beercss';
import './Home.css'
import SoundButton from './SoundButton';

export default function Home() {
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
                <button className='ldb-btn green3 black-text absolute'>Leaderboards</button>
                <div className='home-content'>
                    <img className='home-logo center' src='./src/assets/homelogo.png'></img>
                    <img
                        className='play-btn center'
                        src="./src/assets/static_play.png"
                        onMouseOver={e => (e.currentTarget.src = "./src/assets/hover_play.png")}
                        onMouseOut={e => (e.currentTarget.src = "./src/assets/static_play.png")}
                    />
                </div>
            </div>
        </>
    )
}

