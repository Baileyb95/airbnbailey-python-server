import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://127.0.0.1:5000/logout', {
            method: 'DELETE'
        })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            console.error('Error logging out:', error);
        });
    };

        return (
            <div>
                <h2>Dashboard</h2>
                <div>
                    <Link to="/rentals">
                        <button>View Rentals</button>
                    </Link>
                </div>
                <div>
                    <Link to="/bookings">
                        <button>View Bookings</button>
                    </Link>
                </div>
                <div>
                    <Link to="/reviews">
                        <button>View Reviews</button>
                    </Link>
                </div>
                <div>
                    <Link to="/manage-listings">
                        <button>Manage Listings</button>
                    </Link>
                </div>
                <div>
                    <Link to="/favorites">
                        <button>View Favorites</button>
                    </Link>
                </div>
                <div>
                    <Link to="/account-settings">
                        <button>Account Settings</button>
                    </Link>
                </div>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div>
                  {/* <ListingPage list={listings} />  */}
                </div>
            </div>
        );
    };

export default DashboardPage;
