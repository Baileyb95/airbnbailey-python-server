import React, { useEffect, useState } from "react";
import Header from '../pages/Header';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [updateUserFormData, setUpdateUserFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  });
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    // Fetch user data based on their user ID (assuming you have the user's ID in localStorage)

    fetch(`/user/${localStorage.getItem('id')}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, []); // Add an empty dependency array to run the effect only once

  const handleUpdateUserFormChange = (event) => {
    const updatedFormData = { ...updateUserFormData };
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    updatedFormData[fieldName] = fieldValue;
    setUpdateUserFormData(updatedFormData);
  }

  const handleUpdateUser = () => {
    const updatedData = {};

    for (const key in updateUserFormData) {
      if (updateUserFormData[key] !== '') {
        updatedData[key] = updateUserFormData[key];
      }
    }

    if (Object.keys(updatedData).length === 0) {
        // No fields to update, so don't send the request
        return;
    }


    fetch(`/user/${localStorage.getItem('id')}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
        // Handle the response if needed
      })
      .catch((error) => {
        console.error('Error updating user information:', error);
        // Handle the error, e.g., display an error message to the user
      });
  };

  const handleDeleteUser = () => {
    if (confirmation) {
      fetch(`/user/${localStorage.id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle the response if needed
          // For example, you can display a confirmation message
          // or redirect the user after successful deletion
        })
        .catch((error) => {
          console.error('Error deleting user account:', error);
          // Handle the error, e.g., display an error message to the user
        })
        .finally(() => {
          navigate('/airbnbailey');
          window.location.reload();
          setConfirmation(false);
        });
    } else {
      setConfirmation(true); // Prompt for confirmation
    }
  };

  return (
    <div>
      <Header />
      <h1 className="text-4xl p-4 font-semibold text-center">Account Settings</h1>
      <div className="flex space-x-8">
        <div className="w-1/2 p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold">User Information</h2>
          <h3>First Name: {user.first_name}</h3>
          <h3>Last Name: {user.last_name}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Phone Number: {user.phone_number}</h3>
        </div>
        <div className="w-1/2 p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold">Update Information</h2>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              value={updateUserFormData.first_name}
              onChange={handleUpdateUserFormChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={updateUserFormData.last_name}
              onChange={handleUpdateUserFormChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={updateUserFormData.email}
              onChange={handleUpdateUserFormChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              value={updateUserFormData.password}
              onChange={handleUpdateUserFormChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={updateUserFormData.phone_number}
              onChange={handleUpdateUserFormChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <button onClick={handleUpdateUser} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update User Information
            </button>
            <button onClick={handleDeleteUser} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              {confirmation ? "Confirm Deletion" : "Delete Account"}
            </button>
            {confirmation && (
              <div>
                <p>Are you sure you want to delete your account?</p>
                <button onClick={() => setConfirmation(false)} className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
