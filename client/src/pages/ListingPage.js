import React, { useState, useEffect } from 'react';

const PropertyListing = ({ image_url, title, description, city, state, zip_code, price }) => (
  <div>
    <h1>Property Listing</h1>
    <ul>
      <li>
        <img src={image_url} alt="rental property" />
        <h2>{title}</h2>
        <p>Description: {description}</p>
        <p>City: {city}</p>
        <p>State: {state}</p>
        <p>Zip Code: {zip_code}</p>
        <p>Price: {price}</p>
      </li>
    </ul>
  </div>
);

const ListingPage = ({ list }) => {
  console.log(list);
  if (!Array.isArray(list) || list.length === 0) {
    return (
      <div>
        <h1>No Property Listings Found</h1>
      </div>
    );
  }

  const rental = list.map((rentals) => (
    <PropertyListing key={rentals.id} {...rentals} />
  ));

  return (
    <div>
      <h1>Property Listings</h1>
      <ul>{rental}</ul>
    </div>
  );
};

const Listings = () => {
  const [listings, setListings] = useState([]);

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
  return (
    <div>
      <div>
        <ListingPage list={listings} />
      </div>
    </div>
  );
};

export default Listings;
