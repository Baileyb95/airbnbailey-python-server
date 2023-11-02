
import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        console.log("message"),
        <div>
            <h1>Welcome to AirbnBailey</h1>
            <p>Please log in or register to continue.</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register" >
                <button>Register</button>
            </Link>
        </div>
    );
};

export default HomePage;

