import React, { useState, useEffect } from 'react';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/bookings/`, {
      method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
            })
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user bookings:', error);
            });
  }, []);

  const handleDeleteBooking = (bookingId) => {
  
  };

  const handleChangeBooking = (bookingId) => {
  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>Check-In: {booking.check_in}</p>
              <p>Check-Out: {booking.check_out}</p>
              <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
              <button onClick={() => handleChangeBooking(booking.id)}>Change</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;
