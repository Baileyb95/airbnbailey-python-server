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

        fetch(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`)
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
    
        fetch(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`, {
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
            fetch(`http://127.0.0.1:5000/user/${localStorage.id}`, {
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
            //   navigate('/'); // 
            //   window.location.reload(); 
              setConfirmation(false); 
            });
        } else {
          setConfirmation(true); // Prompt for confirmation
        }
      };
      

    return (
        <div>
            <Header />
            <h1>Account Settings</h1>
            <div>
                <h2>First Name: {user.first_name}</h2>
                <h2>Last Name: {user.last_name}</h2>
                <h3>Email: {user.email}</h3>
                <h3>Phone Number: {user.phone_number}</h3>
                <button onClick={handleUpdateUser}>Update User Information</button>
                <button onClick={handleDeleteUser}>
                    {confirmation ? "Confirm Deletion" : "Delete Account"}
                </button>
                {confirmation && (
                    <div>
                        <p>Are you sure you want to delete your account?</p>
                        <button onClick={() => setConfirmation(false)}>Cancel</button>
                    </div>
                )}
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={updateUserFormData.first_name}
                        onChange={handleUpdateUserFormChange}
                    />
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={updateUserFormData.last_name}
                        onChange={handleUpdateUserFormChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={updateUserFormData.email}
                        onChange={handleUpdateUserFormChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={updateUserFormData.password}
                        onChange={handleUpdateUserFormChange}
                    />
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={updateUserFormData.phone_number}
                        onChange={handleUpdateUserFormChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
