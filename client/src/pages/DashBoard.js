import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://127.0.0.1:5000/logout', {
            method: 'DELETE'
        })
        navigate('/login');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <Link to="/listings">
                    <button>View Listings</button>
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
                <Link to="/settings">
                    <button>Account Settings</button>
                </Link>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default DashboardPage;
