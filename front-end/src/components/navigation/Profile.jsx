import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

function Profile() {
    const handleLogout = () => {
        // Clear session storage
        sessionStorage.clear();
        
        // Clear local storage
        localStorage.clear();
        
        // Redirect to login page
        window.location.href = '/login'; // You can use react-router-dom's history or useNavigate hook for navigation in a more React way
    };

    return (
        <div className="profile-container">
            <h1>Your Profile</h1>
            <div className="profile-actions">
                {/* Other account-related actions can be placed here */}
                <Button variant="primary">Account Settings</Button>
                <Button variant="info">Change Password</Button>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}

export default Profile;
