// src/components/SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Remove JWT from local storage or cookies
        localStorage.removeItem('token'); // If you're using local storage

        // Optionally, make a request to the server to invalidate the token (if needed)
        // axios.post('/api/auth/logout').then(() => {
        //   navigate('/login');
        // });

        // Redirect user to the login page
        navigate('/login');
    };

    return (
        <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
        </button>
    );
};

export default SignOut;
