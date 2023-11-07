import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage(''); // Clear error message on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send registration data to the backend
        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.status === 200) {
                // Registration was successful, navigate to the login page
                navigate('/login');
            } else if (response.status === 409) {
                // User already exists
                setErrorMessage('Email or username is already in use.');
            } else {
                // Handle other registration errors
                setErrorMessage('Registration failed. Please try again later.');
            }
        })
        .catch(error => {
            // Handle fetch error
            console.error('Registration error:', error);
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-lg p-6 rounded-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {errorMessage && (
                    <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
                        {errorMessage}
                    </div>
                )}
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
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
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
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
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block text-gray-700">Phone Number:</label>
                        <input
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
                </form>
                <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;
