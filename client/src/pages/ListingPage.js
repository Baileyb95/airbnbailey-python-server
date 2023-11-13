import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    description: '',
    city: '',
    state: '',
    zip_code: '',
    price: '',
  });

  useEffect(() => {
    fetch(`/user/${localStorage.getItem('id')}/listings`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListings(data);
      })
      .catch((error) => {
        console.error('Error fetching property listings:', error);
      });
  }, []);

  const handleDeleteListing = (id) => {
    fetch(`/listings/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error deleting property listing:', error);
      })
      .finally(() => {
        navigate('/listings-Page');
        window.location.reload();
      });
  };

  const handleUpdateFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...updateFormData };
    newFormData[fieldName] = fieldValue;
    setUpdateFormData(newFormData);
  };

  const handleUpdateListing = () => {
    const updatedData = {};

    for (const key in updateFormData) {
      if (updateFormData[key] !== '') {
        updatedData[key] = updateFormData[key];
      }
    }

    if (Object.keys(updatedData).length === 0) {
      // No fields to update, so don't send the request
      setSelectedListing(null);
      setUpdateFormData({
        title: '',
        description: '',
        city: '',
        state: '',
        zip_code: '',
        price: '',
        image_url: '',
      });
      return;
    }

    const addUserToFormData = { ...updatedData, user_id: localStorage.id };

    fetch(`/listings/${selectedListing.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addUserToFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListings(data);
        setSelectedListing(null);
        setUpdateFormData({
          title: '',
          description: '',
          city: '',
          state: '',
          zip_code: '',
          price: '',
          image_url: '',
        });
      })
      .catch((error) => {
        console.error('Error updating property listing:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-semibold text-center"> Your Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={listing.image_url}
                alt="Rental property"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{listing.title}</h2>
                <p className="text-gray-600">{listing.description}</p>
                <p className="text-gray-600">City: {listing.city}</p>
                <p className="text-gray-600">State: {listing.state}</p>
                <p className="text-gray-600">ZIP Code: {listing.zip_code}</p>
                <p className="text-gray-600">Price: {listing.price}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => setSelectedListing(listing)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedListing && (
          <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-semibold p-4">Edit Listing</h2>
            <form className="p-4">
              <label className="block">
                Title:
                <input
                  type="text"
                  name="title"
                  value={updateFormData.title}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <label className="block">
                Image URL:
                <input
                  type="text"
                  name="image_url"
                  value={updateFormData.image_url}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <label className="block">
                Description:
                <input
                  type="text"
                  name="description"
                  value={updateFormData.description}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <label className="block">
                City:
                <input
                  type="text"
                  name="city"
                  value={updateFormData.city}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <label className="block">
                State:
                <input
                  type="text"
                  name="state"
                  value={updateFormData.state}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <label className="block">
                ZIP Code:
                <input
                  type="text"
                  name="zip_code"
                  value={updateFormData.zip_code}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <label className="block">
                Price:
                <input
                  type="text"
                  name="price"
                  value={updateFormData.price}
                  onChange={handleUpdateFormChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              </label>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpdateListing}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Listing
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
