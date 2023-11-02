import React, {useEffect, useState} from 'react';

const DisplayRentals = ({ list }) => {

    const [rental,setRental] = useState([]);

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
  return (
    <div>
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
        </div>
      ))}
    </div>
  );
};

export default DisplayRentals;
