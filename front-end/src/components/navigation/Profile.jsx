import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
      <div className="profile-actions">
        <div className="profile-action">
          <Button variant="primary">Account Settings</Button>
        </div>

        <div className="profile-action">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;