import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

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
    e.preventDefault(); // Prevent the default form submission
    const addUserToFormData = { ...formData, user_id: localStorage.id };
    fetch('http://127.0.0.1:5000/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addUserToFormData),
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 shadow-lg border border-gray-300 rounded">
        <h2 className="text-2xl font-semibold">Property Management</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="image_url">Image URL:</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Listing
          </button>
        </form>
        <div className="mt-4 flex justify-end">
          <Link to="/listings-Page">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View Listings
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagementPage;
