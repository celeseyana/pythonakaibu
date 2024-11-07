import './Navbar.css';
import 'beercss';
import { Link } from 'react-router-dom';

export default function Navbar({auth, name, handleLogout, message}) {
    return (
        <>
            <div>
            {
                auth ?
                    <nav className='nav-navbar'>
                        <span className='white-text bold'>Welcome, {name}.</span>
                        <button className='small-round red5' onClick={handleLogout}>
                            <span className='bold'>Logout</span>
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
