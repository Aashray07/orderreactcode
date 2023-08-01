import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // Send the POST request to your backend API
      console.log("pprprp");
      console.log(process.env.REACT_APP_ORDER_BASE_URL);
      const response = await fetch(`${process.env.REACT_APP_ORDER_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      if (response.ok) {
        alert("Registration successfull");
        setRegistrationStatus('Registration successful!'); // Set the registration status message
        // Clear the input fields after registration
        setEmail('');
        setPassword('');
      } else {
        // Handle the case when the registration failed
        console.log('Registration failed.');
        setRegistrationStatus('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      setRegistrationStatus('Error occurred during registration. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {registrationStatus && <p>{registrationStatus}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
