import Yurubg from './Yurubg';
import 'beercss';
import './Registration.css';

export default function Registration() {
    return (
        <>
            <div>
                <Yurubg />
            </div>

            <div className='reg-container absolute center'>
                <form className='reg-fields white center middle'>

                    <div className='reg-top-text'>
                        <span>Welcome to PythonAkaibu!</span>
                        <span>Enter your details here for registration!</span>
                    </div>

                    <div className="reg-name field border label">
                        <input type='text' name='text' />
                        <label>Name</label>
                    </div>

                    <div className="reg-email field border label">
                        <input type='email' name='email' />
                        <label>Email</label>
                    </div>

                    <div className="reg-password field border label">
                        <input type='password' name='password' />
                        <label>Password</label>
                    </div>

                    <div className="reg-password-cfm field border label">
                        <input type='password' name='password' />
                        <label>Confirm Password</label>
                    </div>

                    <div className='reg-buttons center'>
                        <button className="primary login-btn black-text green3">Back to Login</button>    
                        <button className="primary reg-btn black-text green3">Register</button>
                    </div>

                </form>
            </div>
        </>
    )
}