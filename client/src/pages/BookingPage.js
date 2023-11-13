import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`/user/${localStorage.getItem('id')}/bookings`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching property bookings:', error);
      });
  }, []);

  const handleDeleteListing = (listingId) => {
    fetch(`/user/${localStorage.getItem('id')}/bookings/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('id'),
        listing_id: listingId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookings(bookings.filter((booking) => booking.id !== listingId));
      })
      .catch((error) => {
        console.error('Error deleting property listing:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Bookings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={String(booking.id)} className="bg-white shadow-lg rounded-lg p-4">
              <Link to={`/rentals/${booking.listing.id}`}>
              <h2 className="text-lg font-semibold mb-2">{booking.listing.title}</h2>
              <img
                src={booking.listing.image_url}
                alt="rental property"
                className="w-full h-48 object-cover mb-2"
              />
               </Link>             
              <p>Description: {booking.listing.description}</p>
              <p>Address: {booking.listing.address}</p>
              <p>City: {booking.listing.city}</p>
              <p>State: {booking.listing.state}</p>
              <p>Zip Code: {booking.listing.zip_code}</p>
              <p>Country: {booking.listing.country}</p>
              <p>Price: {booking.listing.price}</p>
              <p>Check-in: {booking.check_in}</p>
              <p>Check-out: {booking.check_out}</p>
              <button onClick={() => handleDeleteListing(booking.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
