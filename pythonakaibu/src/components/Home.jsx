import './Home.css';
import Yurubg from './Yurubg';
import 'beercss'


export default function Home() {
    return (
        <>
            <div>
                <Yurubg />
            </div>

            <div className="login-container absolute">
                <div className='login-logo-welcome'>
                    <img className='center' src='./src/assets/python.svg'></img>
                    <span>A conquest-inspired interactive Python learning game.</span>
                </div>
                <div className='login-fields white'>
                    
                    <span>Login</span>
                    <span>Please enter your credentials.</span>

                    <div className="login-username field border label">
                        <input />
                        <label>Username</label>
                    </div>

                    <div className="login-password field border label">
                        <input />
                        <label>Password</label>
                    </div>

                    <div className='login-buttons center'>
                        <button className='register-button'>Register</button>
                        <button className='login-button'>Login</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}


// REMINDER TO MOVE THIS TO LOGIN INSTEAD OF HOME
// REMINDER TO MOVE THIS TO LOGIN INSTEAD OF HOME
// REMINDER TO MOVE THIS TO LOGIN INSTEAD OF HOME