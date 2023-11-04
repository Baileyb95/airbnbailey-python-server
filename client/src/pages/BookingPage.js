import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Bookings = () => {
    // const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        fetch(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}/bookings`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBookings(data);
            })
            .catch((error) => {
                console.error('Error fetching property bookings:', error);
            });
    }, []);
    const handleDeleteListing = (listingId) => {
        fetch(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}/bookings/${listingId}`, {
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
                // setBookings(bookings.filter((booking) => booking.id !== listingId));
            })
            .catch((error) => {
                console.error('Error deleting property listing:', error);
            })
            .finally(() => {
                // navigate('/rentals');
                // window.location.reload();
            });
      };
    return (
        <div>
            <Header />
            <h1>bookings</h1>
            <div>
            {bookings.map((booking) => (
                <div key={booking.id} className="booking">
                <h2>Booking for {booking.listing.title}</h2>
                <a>Image: <img src={booking.listing.image_url} alt="Listing" /></a>
                <p>Description: {booking.listing.description}</p>
                <p>Address: {booking.listing.address}</p>
                <p>City: {booking.listing.city}</p>
                <p>State: {booking.listing.state}</p>
                <p>Zip Code: {booking.listing.zip_code}</p>
                <p>Country: {booking.listing.country}</p>
                <p>Price: {booking.listing.price}</p>
                <p>Check-in: {booking.check_in}</p>
                <p>Check-out: {booking.check_out}</p>
                <button onClick={() => handleDeleteListing(booking.id)}>Delete</button>
   </div>
))}
            </div>
        </div>
    );
};

export default Bookings;
