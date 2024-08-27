import Navbar from './Navbar';
import Homebg from './Homebg';
import axios from 'axios';
import SoundButton from './SoundButton';
import Leaderboard from './Leaderboard';
import 'beercss';
import './Home.css'
import { useEffect, useState } from 'react';

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    location.reload(true);
                } else {
                    alert("error");
                }
            })
        // .catch(err = console.log(err)) maybe but err isnt 
        // picking up but it works without it so uh well idk lol xd
    }

    const displaySwitch = (display, setDisplay, auth) => {
        switch (display) {
            case 'leaderboard':
                return (
                    <>
                        <button className='back-btn absolute green3 black-text' onClick={() => setDisplay('home')}>Back</button>
                        <Leaderboard />
                    </>
                );
            case 'play':
                return (
                    <>
                        <h1>Play Page Tests</h1>
                        <button className='back-btn absolute green3 black-text' onClick={() => setDisplay('home')}>Back</button>
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
                        {         
                            auth ?  
                                    
                                <img
                                    className='play-btn center'
                                    src="./src/assets/static_play.png"
                                    onMouseOver={e => (e.currentTarget.src = "./src/assets/hover_play.png")}
                                    onMouseOut={e => (e.currentTarget.src = "./src/assets/static_play.png")}
                                    onClick={() => setDisplay('play')}
                                    alt="Play Button"
                                />
                                    
                            :
        
                            <h1>Login to Play!</h1>
                        }
                    </div>
                    </>
                );
        }
    }

export default function Home() {
    const [display, setDisplay] = useState('home');
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if (res.data.Status === "Success") {
                setAuth(true);
                setName(res.data.name);
            } else {
                setAuth(false);
                setMessage(res.data.Message);
            }
        })
    }, [])

    return (
        <>
            <div>
                <Navbar auth={auth} name={name} handleLogout={handleLogout} message={message}/>
            </div>

            <div>
                <Homebg />
            </div>

            <div className='parent-container'>
                <div className='absolute top right'>
                    <SoundButton />
                </div>
                {displaySwitch(display, setDisplay, auth)}
            </div>
        </>
    )
}

