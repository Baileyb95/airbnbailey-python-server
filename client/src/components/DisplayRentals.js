import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../pages/Header';

const DisplayRentals = ({ list }) => {
  const [rental, setRental] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [booking, setBooking] = useState([]);


  const handleBooking = (booking) => {
    setBooking(booking);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (checkInDate && checkOutDate) {
      const bookingData = {
        listing_id: booking,
        check_in: checkInDate,
        check_out: checkOutDate,
      };
      if (checkInDate && checkOutDate) {
        const addUserToFormData = { ...bookingData, user_id: localStorage.id };
        fetch('http://127.0.0.1:5000/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addUserToFormData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setIsBookingModalOpen(false);
          });
      } else {
        alert('Please select a check-in and check-out date.');
      }
    }
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/listings')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRental(data);
      })
      .catch((error) => {
        console.error('Error fetching property listings:', error);
      });
  }, []);

  console.log(list);
  const handleFavorite = (listingId) => {
    const favoriteData = {
      user_id: localStorage.id,
      listing_id: listingId,
    };
   
    fetch('http://127.0.0.1:5000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
   };


  return (
    <div>
      <Header />
      <h1>All Rentals</h1>
      {rental.map((rental) => (
        <div key={rental.id} className="rental-listing">
          <img src={rental.image_url} alt="rental property" />
          <h2>{rental.title}</h2>
          <p>Description: {rental.description}</p>
          <p>City: {rental.city}</p>
          <p>State: {rental.state}</p>
          <p>Zip Code: {rental.zip_code}</p>
          <p>Price: {rental.price}</p>
          <button onClick={() => handleFavorite(rental.id)}>Add to Favorites</button>
          <button onClick={() => handleBooking(rental.id)}>Book Now</button>
          {isBookingModalOpen && (
            <div className="booking-modal">
              <div className="booking-modal-content">
                <div className="booking-modal-header">
                  <h2>Book Now</h2>
                </div>
                <div className="booking-modal-body">
                  <div className="booking-modal-inputs">
                    <label htmlFor="check-in">Check In:</label>
                    <DatePicker
                      selected={checkInDate}
                      onChange={(date) => setCheckInDate(date)}
                      selectsStart
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      dateFormat="MM/dd/yyyy"
                      showTimeSelect={false}
                    />
                    <label htmlFor="check-out">Check Out:</label>
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      selectsEnd
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      dateFormat="MM/dd/yyyy"
                      showTimeSelect={false}
                    />
                  </div>
                  <div className="booking-modal-buttons">
                    <button onClick={handleConfirmBooking}>Confirm</button>
                    <button onClick={() => setIsBookingModalOpen(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayRentals;
