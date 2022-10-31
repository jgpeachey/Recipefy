import React from 'react';
import "./index.css"

import { useState } from 'react';

export default function Register()
{
    //States for registration
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    //Handle event for name
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    //Handle event for email
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    //Handle event for password
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    //Handle submission of the form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '') {
         setError(true);
        }
        else {
            setSubmitted(true);
            setError(false);
        }
    };

    //Show success message
    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h1>User {username} successfully registered!!</h1>
        </div>
        );
    };
 
    //Show error message if error is true
    const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <h1>Please enter all the fields</h1>
        </div>
        );
    };

    return (
        <div className="Register-Form">
          <div className="Title">
            <h1>Register</h1>
          </div>
     
          {/* Calling to the methods */}
          <div className="Messages">
            {errorMessage()}
            {successMessage()}
          </div>
     
          <form method="post">
            {/* Labels and inputs for form data */}
            <input placeholder ="Username" onChange={handleUsername} className="Register-Input"
              value={username} type="text" />
     
            <input placeholder ="Email" onChange={handleEmail} className="Register-Input"
              value={email} type="email" />
     
            <input placeholder="Password" onChange={handlePassword} className="Register-Input"
              value={password} type="password" />
     
            <button onClick={handleSubmit} className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
    );
}