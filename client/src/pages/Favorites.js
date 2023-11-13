import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`/favorites/${localStorage.getItem('id')}`)
      .then((response) => response.json())
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error('Error fetching property favorites:', error);
      });
  }, []);

  const handleDeleteFavorite = (listingId) => {
    fetch(`/favorites/${localStorage.getItem('id')}/${listingId}`, {
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
    <div>
      <Header />
      <div className="p-4 md:w-2/5 lg:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Favorites</h1>
        {favorites.map((favorite) => (
          <div key={favorite.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <Link to={`/rentals/${favorite.id}`}>
              <h2 className="text-xl font-semibold mb-2">{favorite.title}</h2>
              {favorite.image_url && (
                <div>
                  <img
                    src={favorite.image_url}
                    alt="Listing"
                    className="mb-2 rounded-lg w-160 h-100 object-cover" // Adjust the width and height here
                  />
                </div>
              )}
            </Link>
            <p className="text-gray-600">Description: {favorite.description}</p>
            <p className="text-gray-600">Address: {favorite.address}</p>
            <p className="text-gray-600">City: {favorite.city}</p>
            <p className="text-gray-600">State: {favorite.state}</p>
            <p className="text-gray-600">Zip Code: {favorite.zip_code}</p>
            <p className="text-gray-600">Price: {favorite.price}</p>
            <button
              onClick={() => handleDeleteFavorite(favorite.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
