import React, { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../pages/Header';
import { Link } from 'react-router-dom';

const DisplayRentals = ({ list }) => {
  const [rental, setRental] = useState([]);

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
          <Link to={`/rentals/${rental.id}`}>
            <h2>{rental.title}</h2>
            <img src={rental.image_url} alt="rental property" />
          </Link>
          <p>Description: {rental.description}</p>
          <p>City: {rental.city}</p>
          <p>State: {rental.state}</p>
          <p>Price: {rental.price}</p>
          <button onClick={() => handleFavorite(rental.id)}>Add to Favorites</button>
        </div>
      ))}
    </div>
  );
};

export default DisplayRentals;
