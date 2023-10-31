import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashBoard';
import ListingPage from './pages/ListingPage';
import BookingPage from './pages/BookingPage';
import ReviewPage from './pages/ReviewPage';
import PropertyManagementPage from './pages/PropertyManagementPage';


function App() {
    return (
        <Routes>
                <Route path="/" element ={<HomePage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/dashboard" element={<DashboardPage/>} />
                <Route path="/listings" element={<ListingPage/>} />
                <Route path="/bookings" element={<BookingPage/>} />
                <Route path="/reviews" element={<ReviewPage/>} />
                <Route path="/manage-listings" element={<PropertyManagementPage/>} /> 
        </Routes>
    );
}

export default App;
