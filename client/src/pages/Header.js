import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
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
        <div className="container">
    <div className="left">
        <Link className="main-button" to="/dashboard">
            Home
        </Link>
        <Link className="all-button" to="/rentals">
            View Rentals
        </Link>
        <Link className="add-button" to="/bookings">
            Bookings
        </Link>
    </div>
    {/* <div className="center">
        <h1>
            <img src="https://i.gyazo.com/a7d613272ba5d70a3f39574a0c9fff67.png" alt="Pillow Logo" className="logo" />
        </h1>
    </div> */}
    <div className="right">
        <Link className="fav-button" to="/favorites">
            Favorites
        </Link>
        <Link className="listing-button" to="/manage-listings">
            Manage Listing
        </Link>
        <div>
                    <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
</div>
    );
};

export default Header;