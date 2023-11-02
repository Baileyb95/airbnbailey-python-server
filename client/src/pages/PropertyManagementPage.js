import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PropertyManagementPage = () => {
    const [formData, setFormData] = useState({
        user_id: '', 
        image_url: '',
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        const addUserToFormData = {...formData, user_id: localStorage.id}
        fetch('http://127.0.0.1:5000/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addUserToFormData),
        });
        };
    return (
        <div>
            <h2>Property Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image_url">Image URL:</label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="zip_code">ZIP Code:</label>
                    <input
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>,
                <button type="submit">Submit Listing</button>
                <div>
                    <Link to="/listings-Page">
                        <button>View Listings</button>
                    </Link>
                </div>
                <div><Link to="/dashboard"><button>DashBoard</button></Link> </div>
            </form>
        </div>
    );
};

export default PropertyManagementPage;
