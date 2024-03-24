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
        <div className="form-container">
            <h1>Your Profile</h1>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Profile;
