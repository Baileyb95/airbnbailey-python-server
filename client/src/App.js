import React from 'react';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashBoard';
import ListingPage from './pages/ListingPage';
import BookingPage from './pages/BookingPage';
// import ReviewPage from './pages/ReviewPage';
import DisplayRentals from './components/DisplayRentals';
import PropertyManagementPage from './pages/PropertyManagementPage';
import Favorites from './pages/Favorites';
import AccountSettings from './pages/AccountSettings';
import TheRentalProperty from './components/TheRentalProperty';


function App() {

    const [favorites, setFavorites] = useState([]);
    function handleAddToFavorites(favHouse) {
        setFavorites([...favorites, favHouse])
      }

    return (
        <Routes>
                <Route path="/favorites" element={<Favorites favorites={favorites} handleAddToFavorites={handleAddToFavorites}/>} />
                <Route path="/rentals/:id" element={<TheRentalProperty/>} />
                <Route path="/" element ={<HomePage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/dashboard" element={<DashboardPage/>} />
                <Route path="/rentals" element={<DisplayRentals/>} />
                <Route path="/listings-page" element={<ListingPage/>} />
                <Route path="/account-settings" element={<AccountSettings/>} />
                <Route path="/bookings" element={<BookingPage/>} />
                {/* <Route path="/reviews" element={<ReviewPage/>} /> */}
                <Route path="/manage-listings" element={<PropertyManagementPage/>} /> 
        </Routes>
    );
}

export default App;
