import './Login.css'
import Yurubg from './Yurubg';
import 'beercss'

export default function Login() {
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
            <input type='text' name='text' />
            <label>Username</label>
          </div>

          <div className="login-password field border label">
            <input type='password' name='password' />
            <label>Password</label>
          </div>

          <div className='login-buttons center'>
            <button className='register-button green3 black-text'>Register</button>
            <button className='login-button green3 black-text' type='submit'>Login</button>
          </div>

        </div>
      </div>
    </>
  )
}

