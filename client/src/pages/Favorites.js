import React, { useState, useEffect } from "react";
import Header from "./Header";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/favorites/${localStorage.getItem('id')}`)
      .then((response) => response.json())
      .then((data) => {
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
        // After successful deletion, you should update the state to remove the deleted favorite
        setFavorites(favorites.filter((favorite) => favorite.id !== listingId));
      })
      .catch((error) => {
        console.error('Error deleting property favorite:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="favorites">
        <h1>Favorites</h1>
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite">
            <h2>Favorite: {favorite.title}</h2>
            {favorite.image_url && (
              <div>
                <p>Image: <img src={favorite.image_url} alt="Listing" /></p>
              </div>
            )}
            <p>Description: {favorite.description}</p>
            <p>Address: {favorite.address}</p>
            <p>City: {favorite.city}</p>
            <p>State: {favorite.state}</p>
            <p>Zip Code: {favorite.zip_code}</p>
            <p>Price: {favorite.price}</p>
            <button onClick={() => handleDeleteFavorite(favorite.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favorites;
