import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
      .then(() => {
        navigate('/airbnbailey');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/dashboard" className="main-button hover:text-blue-500">
            Home
          </Link>
          <Link to="/rentals" className="all-button hover:text-blue-500">
            View Rentals
          </Link>
          <Link to="/bookings" className="add-button hover:text-blue-500">
            Bookings
          </Link>
          <Link to="/favorites" className="fav-button hover:text-blue-500">
            Favorites
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/manage-listings" className="listing-button hover:text-blue-500">
            Manage Listings
          </Link>
          <Link to="/account-settings" className="add-button hover:text-blue-500">
            Account Settings
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
