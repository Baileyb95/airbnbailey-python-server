import React, { useEffect, useState } from "react";
import Header from '../pages/Header';

const AccountSettings = () => {
    const [user, setUser] = useState({});
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
        const userId = localStorage.id; // You need to set this value in your code

        fetch(`http://127.0.0.1:5000/user/`)
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
        // Perform the update operation based on the fields that the user wants to update
        // You need to implement this based on your server and API design
        console.log("User information updated:", updateUserFormData);
    }

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
              // navigate('/'); // 
              // window.location.reload(); 
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
                <h3>Password: {user.password}</h3>
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
