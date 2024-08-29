import Navbar from './Navbar';
import Homebg from './Homebg';
import axios from 'axios';
import SoundButton from './SoundButton';
import Leaderboard from './Leaderboard';
import 'beercss';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
    const [display, setDisplay] = useState('home');
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); 

    const toFirstMap = () => {
        navigate('/map1'); 
    };

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
    };

    const displaySwitch = (display, setDisplay, auth) => {
        switch (display) {
            case 'leaderboard':
                return (
                    <>
                        <img src='./src/assets/arrow_back.png' className='back-btn absolute' onClick={() => setDisplay('home')}></img>
                        <Leaderboard />
                    </>
                );
            case 'play':
                return (
                    <>
                        <div className='lvl-btn-group'>
                            <div>
                                <img
                                    className='lvl-btn'
                                    src="./src/assets/static_base.png"
                                    onMouseOver={e => (e.currentTarget.src = "./src/assets/hover_base.png")}
                                    onMouseOut={e => (e.currentTarget.src = "./src/assets/static_base.png")}
                                    onClick={toFirstMap}
                                />
                                <span className='changa-one-regular absolute center middle'>Map 1</span>
                            </div>

                            <div>
                                <img
                                    className='lvl-btn'
                                    src="./src/assets/static_base.png"
                                    onMouseOver={e => (e.currentTarget.src = "./src/assets/hover_base.png")}
                                    onMouseOut={e => (e.currentTarget.src = "./src/assets/static_base.png")}
                                />
                                <span className='changa-one-regular absolute center middle'>Map 2</span>
                            </div>
                        </div>

                        <img src='./src/assets/arrow_back.png' className='back-btn absolute' onClick={() => setDisplay('home')}></img>
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
    };

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
    }, []);

    return (
        <>
            <div>
                <Navbar auth={auth} name={name} handleLogout={handleLogout} message={message} />
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
    );
}

