import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListingPage from './ListingPage';

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
                <h2>Dashboard</h2>
                <div>
                    <Link to="/listings-page">
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
                <div>
                    <ListingPage list={listings} /> {/* Render ListingPage here */}
                </div>
            </div>
        );
    };

    return <Listings />; // Render the Listings component
};

export default DashboardPage;
