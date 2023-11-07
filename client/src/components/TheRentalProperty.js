import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../pages/Header";
import { useParams } from "react-router-dom";

const TheRentalProperty = () => {
  const { id } = useParams();
  const [rentalListing, setRentalListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [favoriteNotification, setFavoriteNotification] = useState("");

  const handleBooking = (listingId) => {
    setBooking(listingId);
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

      fetch("http://127.0.0.1:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUserToFormData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsBookingModalOpen(false);
          setConfirmationMessage("Booking confirmed");
          setTimeout(() => {
            setConfirmationMessage("");
          }, 3000);
        });
    } else {
      alert("Please select a check-in and check-out date.");
    }
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/listings/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRentalListing(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleFavorite = (listingId) => {
    const favoriteData = {
      user_id: localStorage.id,
      listing_id: listingId,
    };

    fetch("http://127.0.0.1:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFavoriteNotification("Added to favorites");
        setTimeout(() => {
          setFavoriteNotification("");
        }, 3000);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex space-x-4 p-4">
        <div className="w-1/2 shadow-lg p-4">
          {rentalListing && (
            <div key={String(rentalListing.id)} className="rental-listing">
              <h2 className="text-xl font-bold mb-2">{rentalListing.title}</h2>
              <img src={rentalListing.image_url} alt="Listing" className="mb-2 rounded" />
              <p className="text-gray-600">Description: {rentalListing.description}</p>
              <p className="text-gray-600">Address: {rentalListing.address}</p>
              <p className="text-gray-600">City: {rentalListing.city}</p>
              <p className="text-gray-600">State: {rentalListing.state}</p>
              <p className="text-gray-600">Zip Code: {rentalListing.zip_code}</p>
              <p className="text-gray-600">Price: {rentalListing.price}</p>
              <p className="text-gray-600">Country: {rentalListing.country}</p>
              <button
                onClick={() => handleFavorite(rentalListing.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              >
                Add to Favorites
              </button>
              {favoriteNotification && (
                <p className="text-green-500 mt-2">{favoriteNotification}</p>
              )}
            </div>
          )}
        </div>
        <div className="w-1/2 shadow-lg p-4">
          <button
            onClick={() => handleBooking(rentalListing.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Book Now
          </button>
          {isBookingModalOpen && (
            <div className="booking-modal">
              <div className="booking-modal-content">
                <div className="booking-modal-header">
                  <h2>Book Now</h2>
                </div>
                <div className="booking-modal-body">
                  <div className="booking-modal-inputs">
                    <label htmlFor="check-in" className="block mt-4">Check In:</label>
                    <DatePicker
                      selected={checkInDate}
                      onChange={(date) => setCheckInDate(date)}
                      selectsStart
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      dateFormat="MM/dd/yyyy"
                      showTimeSelect={false}
                      className="border border-gray-300 rounded px-3 py-2 mt-2"
                    />
                    <label htmlFor="check-out" className="block mt-4">Check Out:</label>
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      selectsEnd
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      dateFormat="MM/dd/yyyy"
                      showTimeSelect={false}
                      className="border border-gray-300 rounded px-3 py-2 mt-2"
                    />
                  </div>
                  <div className="booking-modal-buttons">
                    <button
                      onClick={handleConfirmBooking}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setIsBookingModalOpen(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Display confirmation message */}
          {confirmationMessage && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded text-green-500">
              {confirmationMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TheRentalProperty;
