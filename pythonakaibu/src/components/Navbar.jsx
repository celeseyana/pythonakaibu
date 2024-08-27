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
