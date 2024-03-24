import React from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

function Profile() {
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
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
