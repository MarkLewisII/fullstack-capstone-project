import React, { useState } from 'react';

import {urlConfig} from '../../config'; //Task 1: Import urlConfig from `giftlink-frontend/src/config.js`
import { useAppContext } from '../../context/AuthContext'; //Task 2: Import useAppContext `giftlink-frontend/context/AuthContext.js`
import { useNavigate } from 'react-router-dom'; //Task 3: Import useNavigate from `react-router-dom` to handle navigation after successful registration.

import './RegisterPage.css';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Do these tasks inside the RegisterPage function, after the useStates definition
    const [showerr, setShowerr] = useState(''); //Task 4: Include a state for error message.
    const navigate = useNavigate(); //Task 5: Create a local variable for `navigate`   and `setIsLoggedIn`.
    const {setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
            method: 'POST', //Task 6: Set method
            headers: {
                'content-type': 'application/json',
            }, //Task 7: Set headers
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }) //Task 8: Set body to send user details
        });

        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);

            setIsLoggedIn(true);
            navigate('/app');

            if (json.error) {
                setShowerr(json.error);
            }
        }
    }

         return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="register-card p-4 border rounded">
                            <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                    {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                    <div className='mb-3'>
                        <label htmlFor="firstName" className="form label">First Name</label>
                        <input
                        id="firstName"
                        type='text'
                        className='form-control'
                        placeholder='Enter your firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="lastName" className="form label">Last Name</label>
                        <input
                        id="lastName"
                        type='text'
                        className='form-control'
                        placeholder='Enter your lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="email" className="form label">Email</label>
                        <input
                        id="email"
                        type='text'
                        className='form-control'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="password" className="form label">Password</label>
                        <input
                        id="password"
                        type='password'
                        className='form-control'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='text-danger'>{showerr}</div>
                    <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                         </div>
                    </div>
                </div>
            </div>

         )//end of return
}

export default RegisterPage;