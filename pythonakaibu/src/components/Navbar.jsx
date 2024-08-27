import { useEffect, useState } from 'react';
import axios from 'axios';
import './Navbar.css';
import 'beercss';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [auth, setAuth] = useState(false)
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

    return (
        <>
            <div>
            {
                auth ?
                    <nav className='nav-navbar'>
                        <button className="circle transparent">
                            <i>menu</i>
                        </button>
                        <span className='max center-align'>Welcome, {name}.</span>
                        <button className='circle red5' onClick={handleLogout}>
                            <i>logout</i>
                        </button>
                    </nav>
                :
                    <nav className='nav-navbar2'>
                        <span className='center'>{message}</span>
                        <Link to = "/login">
                            <button className='green3 black-text'>Login</button>
                        </Link>
                    </nav>
            }
            </div>
        </>
    )
}
