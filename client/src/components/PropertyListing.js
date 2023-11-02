import React from 'react';

function PropertyListing({image_url, title, description, city, state, zip_code, price}) {

  return (
    <div>
      <h1>Property Listings</h1>
      <ul>
        <li>
          <img src={image_url} alt="rental property" />
          <h2>title: {title}</h2>
          <p>Description: {description}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Zip Code: {zip_code}</p>
          <p></p>
        </li>
      </ul>
    </div>
  );
}

export default PropertyListing;
