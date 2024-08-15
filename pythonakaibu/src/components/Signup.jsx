import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Yurubg from './Yurubg';
import axios from 'axios';
import 'beercss';
import './Signup.css';

export default function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        successMsg: ''
    });

    //change above

    const handleChange = (event) => {
        setValues({...values, [event.target.name]:event.target.value})
    }

    const handleregSubmit = (event) => {
        event.preventDefault();

        console.log(values.password);
        console.log(values.confirmPassword);

        if (!values.name || !values.email || !values.password) {
            console.log("All fields are required!");
            alert("All fields are required!");
            return;
        }

        if (values.password.length < 8) {
            console.log("Password must be at least 8 characters long.");
            alert("Password must be at least 8 characters long.");
            return;
        }

        // change below
        if (values.password !== values.confirmPassword) {
            console.log("Passwords do not match.");
            alert("Passwords do not match.");
            return;
        }

        console.log(values);
        axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log("registration successful");
                navigate('/login');
            }) 
            .catch(err => console.log(err));   
    }
    // res not picked up idk why (???) works without it anyway

    const navigate = useNavigate();

    const toLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <div>
                <Yurubg />
            </div>

            <div className='reg-container absolute center'>
                <form className='reg-fields white center middle' onSubmit={handleregSubmit}>

                    <div className='reg-top-text'>
                        <span>Welcome to PythonAkaibu!</span>
                        <span>Enter your details here for registration!</span>
                    </div>

                    <div className="reg-name field border label">
                        <input type='text' name='name' onChange={handleChange}/>
                        <label>Name</label>
                    </div>

                    <div className="reg-email field border label">
                        <input type='email' name='email' onChange={handleChange}/>
                        <label>Email</label>
                    </div>

                    <div className="reg-password field border label">
                        <input type='password' name='password' onChange={handleChange}/>
                        <label>Password</label>
                    </div>

                    <div className="reg-password-cfm field border label">
                        <input type='password' name='confirmPassword' onChange={handleChange}/>
                        <label>Confirm Password</label>
                    </div>

                    <div className='reg-buttons center'>
                        <button onClick={toLogin} className="primary login-btn black-text green3">Back to Login</button>    
                        <button type='submit' className="primary reg-btn black-text green3">Register</button>
                    </div>

                </form>
            </div>
        </>
    )
}