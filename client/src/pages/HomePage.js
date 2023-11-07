import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to AirbnBailey</h1>
            <p className="text-lg mb-4">Discover your next adventure with us.</p>
            <div className="space-x-4">
                <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-white hover:bg-gray-300 text-blue-500 px-4 py-2 rounded-lg">
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
