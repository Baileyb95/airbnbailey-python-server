
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


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
    fetch('http://127.0.0.1:5000/listings')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListings(data);
      })
      .catch((error) => {
        console.error('Error fetching property listings:', error);
      });
  }, []);

  console.log(listings);
  const handleDeleteListing = (id) => {
    fetch(`http://127.0.0.1:5000/listings/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setListings(data);
        
      })
      .catch((error) => {
        console.error('Error deleting property listing:', error);
      })
      .finally(() => {
        navigate('/listings-Page');
        window.location.reload();
      })
      ;
  };

  const handleUpdateFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = { ...updateFormData };
    newFormData[fieldName] = fieldValue;
    setUpdateFormData(newFormData);
  };

  const handleUpdateListing = () => {
    const addUserToFormData = { ...updateFormData, user_id: localStorage.id };
    fetch(`http://127.0.0.1:5000/listings/${selectedListing.id}`, {
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
    <div>
      <h1>LISTINGS</h1>
      <div>
        {listings.map((listing) => (
          <div key={listing.id} className="rental-listing">
            <img src={listing.image_url} alt="rental property" />
            <h2>{listing.title}</h2>
            <p>Description: {listing.description}</p>
            <p>City: {listing.city}</p>
            <p>State: {listing.state}</p>
            <p>Zip Code: {listing.zip_code}</p>
            <p>Price: {listing.price}</p>
            <button onClick={() => setSelectedListing(listing)}>Edit</button>
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
          </div>
        ))}
      </div>
      {selectedListing && (
        <div>
          <h2>Edit Listing</h2>
          <form>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={updateFormData.title}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="image_url"
                value={updateFormData.image_url}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={updateFormData.description}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={updateFormData.city}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={updateFormData.state}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Zip Code:
              <input
                type="text"
                name="zip_code"
                value={updateFormData.zip_code}
                onChange={handleUpdateFormChange}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={updateFormData.price}
                onChange={handleUpdateFormChange}
              />
            </label>
            <button onClick={handleUpdateListing}>Update Listing</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Listings;
