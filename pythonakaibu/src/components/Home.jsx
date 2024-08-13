import { useEffect, useState } from 'react';
import axios from 'axios';
import 'beercss'
import { Link } from 'react-router-dom';

function Home() {
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
            }).catch(err = console.log(err))
    }

    return (
        <div>
            {
                auth ?
                <div>
                    <h3>you r in dawg {name}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to = "/login">
                        <button>Login</button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Home
