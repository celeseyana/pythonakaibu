import { useEffect, useState } from 'react';
import axios from 'axios';
import 'beercss'

function Home() {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if (res.data.Status === "Success") {
                setAuth(true);
                setName(res.data.name);
            } else {
                setMessage(res.data.Message);
            }
        })
    }, [])

    return (
        <div>
            {
                auth ?
                <div>
                    <h3>you r in dawg {name}</h3>
                    <button>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <button>Login</button>
                </div>
            }
        </div>
    )
}

export default Home
