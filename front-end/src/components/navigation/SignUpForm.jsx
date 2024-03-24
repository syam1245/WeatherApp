import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://weather-app-ackf.onrender.com/api/signup', { username, email, password });
            if (response.status === 201) { // Check for successful creation status
                setSuccessMessage('User created successfully'); // Set success message
                setUsername(''); // Clear form fields
                setEmail('');
                setPassword('');
            } else {
                setError('Something went wrong');
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="current-name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="current-email"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Display success message */}
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </Form>
        </div>
    );
}

export default SignUpForm;
