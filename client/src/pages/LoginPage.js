import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send login data to the backend
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {localStorage.id = data.id});
                // Login was successful, redirect to the dashboard
                navigate('/dashboard');
            } else if (response.status === 401) {
                // Unauthorized login
                setError('Email or password is incorrect. Please try again.');
            } else {
                // Handle other login errors
                setError('An error occurred during login. Please try again later.');
            }
        })
        .catch(error => {
            // Handle fetch error
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again later.');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
                <p className="mt-4">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
