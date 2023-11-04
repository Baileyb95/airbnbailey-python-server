import React, { useState, useEffect } from "react";
import Header from "./Header";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/favorites/${localStorage.getItem('id')}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFavorites(data);
      })
      .catch((error) => {
        console.error('Error fetching property favorites:', error);
      });
  }, []);

  const handleDeleteFavorite = (listingId) => {
    fetch(`http://127.0.0.1:5000/favorites/${localStorage.getItem('id')}/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // After successful deletion, you should update the state to remove the deleted favorite
        setFavorites(favorites.filter((favorite) => favorite.id !== listingId));
      })
        .then(() => {
            window.location.reload();
        })
      .catch((error) => {
        console.error('Error deleting property favorite:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="favorites">
        <div>Favorites</div>
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite">
            <h2>Favorite: {favorite.listing?.title}</h2>
            <a>Image: <img src={favorite.listing?.image_url} alt="Listing" /></a>
            <p>Description: {favorite.listing?.description}</p>
            <p>Address: {favorite.listing?.address}</p>
            <p>City: {favorite.listing?.city}</p>
            <p>State: {favorite.listing?.state}</p>
            <p>Zip Code: {favorite.listing?.zip_code}</p>
            <p>Country: {favorite.listing?.country}</p>
            <p>Price: {favorite.listing?.price}</p>
            <button onClick={() => handleDeleteFavorite(favorite.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favorites;
