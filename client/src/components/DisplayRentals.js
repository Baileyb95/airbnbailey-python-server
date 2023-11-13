import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../pages/Header';
import { Link } from 'react-router-dom';

const DisplayRentals = ({ list }) => {
  const [rental, setRental] = useState([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    fetch('/listings')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRental(data);
      })
      .catch((error) => {
        console.error('Error fetching property listings:', error);
      });
  }, []);

  const handleFavorite = (listingId) => {
    const favoriteData = {
      user_id: localStorage.id,
      listing_id: listingId,
    };

    fetch('/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteData),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotificationMessage('Rental was added to your favorites');
        setIsNotificationVisible(true);

        // Auto-hide the notification after 4 seconds
        setTimeout(() => {
          setIsNotificationVisible(false);
        }, 3000);

        console.log(data);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-3xl font-semibold text-center">All Rentals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rental.map((rental) => (
          <div
            key={rental.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 p-4"
          >
            <Link to={`/rentals/${rental.id}`}>
              <h2 className="text-lg font-semibold mb-2">{rental.title}</h2>
              <img
                src={rental.image_url}
                alt="rental property"
                className="w-full h-48 object-cover mb-2"
              />
            </Link>
            <p className="text-gray-600 mb-2">Description: {rental.description}</p>
            <p className="text-gray-600 mb-2">City: {rental.city}</p>
            <p className="text-gray-600 mb-2">State: {rental.state}</p>
            <p className="text-gray-600 mb-2">Price: {rental.price}</p>
            <div>
              <button
                onClick={() => handleFavorite(rental.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {isNotificationVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-4 p-4 bg-green-500 text-white rounded shadow text-center">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default DisplayRentals;
