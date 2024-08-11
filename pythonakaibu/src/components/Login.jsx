import { useState } from 'react';
import Yurubg from './Yurubg';
import axios from 'axios';
import './Login.css';
import 'beercss';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/')
        } else {
          alert(res.data.Message)
        }
      })
      .catch(err => console.log(err));
  }

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

        <form className='login-fields white' onSubmit={handleSubmit}>

          <span>Login</span>
          <span>Please enter your credentials.</span>

          <div className="login-email field border label">
            <input type='email' name='email' onChange={e => setValues({...values, email: e.target.value})} />
            <label>Email</label>
          </div>

          <div className="login-password field border label">
            <input type='password' name='password' onChange={e => setValues({...values, password: e.target.value})} />
            <label>Password</label>
          </div>

          <div className='login-buttons center'>
            <button className='register-button green3 black-text'>Register</button>
            <button className='login-button green3 black-text' type='submit'>Login</button>
          </div>

        </form>
      </div>
    </>
  )
}

