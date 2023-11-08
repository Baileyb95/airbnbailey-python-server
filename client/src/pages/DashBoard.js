import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://127.0.0.1:5000/logout', {
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
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-4 shadow-lg border border-gray-300 rounded bg-white-100">
        <div className="flex flex-col items-center">
          <p className='text-3xl font-semibold text-center mb-4'>Dashboard</p>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/rentals">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
                View Rentals
              </button>
            </Link>
            <Link to="/bookings">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
                View Bookings
              </button>
            </Link>
            <Link to="/manage-listings">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
                Manage Listings
              </button>
            </Link>
            <Link to="/favorites">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
                View Favorites
              </button>
            </Link>
            <Link to="/account-settings">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
                Account Settings
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;