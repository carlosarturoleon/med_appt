// Following code has been commented with appropriate comments for your reference.
// Import necessary modules from React and other files
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

// Define a Function component called ProfileCard
const ProfileCard = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Access the navigation functionality from React Router
  const navigate = useNavigate();

  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#2190ff" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
      </div>

      {editMode ? (
        // Edit mode: show editable form
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={userDetails.email || ''}
              disabled
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone || ''}
              onChange={handleInputChange}
            />
          </label>
          <div className="profile-form__actions">
            <button type="submit" className="profile-btn profile-btn--save">Save</button>
            <button type="button" className="profile-btn profile-btn--cancel" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        // View mode: show profile details
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <button className="profile-btn profile-btn--edit" onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

// Export the ProfileCard component as the default export
export default ProfileCard;
