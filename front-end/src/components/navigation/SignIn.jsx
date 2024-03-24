import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

const FormInput = ({ label, type, placeholder, ...props }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control type={type} placeholder={placeholder} {...props} required />
  </Form.Group>
);

function SignIn() {
  const email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email: email.value,
        password: password.value,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        navigate("/profile");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Wrong email address");
      } else if (err.response && err.response.status === 401) {
        setError("Wrong password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <FormInput
          controlId="formEmail"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          {...email}
        />
        <FormInput
          controlId="formPassword"
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...password}
        />
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Login
        </Button>
        <div className="mt-3">
          <Link to="/signup">Create an account. Sign Up</Link>
        </div>
        <div className="mt-3">
          <Link to="/forgot-password">Forgot your password? Reset it</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
