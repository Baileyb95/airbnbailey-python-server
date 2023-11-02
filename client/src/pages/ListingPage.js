import React from 'react';
import PropertyListing from '../components/PropertyListing';

function ListingPage({ list }) {
  // Check if list is an array and contains items
  if (!Array.isArray(list) || list.length === 0) {
    return (
      console.log(list),
      <div>
        <h1>No Property Listings Found </h1>
      </div>
    );
  }

  const rental = list.map(rentals => (
    <PropertyListing key={rentals.id} {...rentals} />
  ));

  return (
    console.log(list),
    console.log(rental),
    <div>
      <h1>Property Listings</h1>
      <ul>{rental}</ul>
    </div>
  );
}

export default ListingPage;
