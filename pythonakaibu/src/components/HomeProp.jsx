import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Home from './Home';

export default function HomeProp() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081', { withCredentials: true })
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Message);
                }
            })
            .catch(err => {
                console.error(err);
                setAuth(false);
            });
    }, []);

    return (
        <>
            <Navbar auth={auth} name={name} message={message} />
            <Home auth={auth} />
        </>
    );
}

