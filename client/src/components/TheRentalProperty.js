import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../pages/Header";
import { useParams } from "react-router-dom";

const TheRentalProperty = () => {
  const { id } = useParams();
  const [rentalListing, setRentalListing] = useState([]);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [booking, setBooking] = useState(null); // Changed to null

  const handleBooking = (listingId) => { // Changed parameter name to listingId
    setBooking(listingId); // Updated to set the listing ID
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (checkInDate && checkOutDate) {
      const bookingData = {
        listing_id: booking,
        check_in: checkInDate,
        check_out: checkOutDate,
      };

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
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/listings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRentalListing([data]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
    

  const handleFavorite = (listingId) => {
    const favoriteData = {
      user_id: localStorage.id,
      listing_id: listingId, // Changed to listingId
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
      <></>
        {rentalListing.map((rentalListings) => (
            <div key={String(rentalListings.id)} className="rental-listing">
                <h2>{rentalListings.title}</h2>
                <a>Image: <img src={rentalListings.image_url} alt="Listing" /></a>
          <button onClick={() => handleFavorite(rentalListings.id)}>Add to Favorites</button>
          <button onClick={() => handleBooking(rentalListings.id)}>Book Now</button>
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
}
export default TheRentalProperty;
