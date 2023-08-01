// 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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the login credentials to the backend API
      const response = await fetch(`${process.env.REACT_APP_ORDER_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("----------");
      console.log(response.ok);

      if (response.ok) {
        const data = await response.json();
        // Login successful - Update the state to reflect the logged-in status
        if(data.success){
        setIsLoggedIn(true);
        console.log(response);
        props.onLogin()
        // Redirect to the OrderPage with the user's email as a URL parameter
        navigate(`/order?email=${encodeURIComponent(email)}`)
        }
      else {

        // Login failed - Show an error message
        alert('Invalid email or password');
      }
    }

      // Clear the input fields after login
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle any errors that occurred during the login process
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {isLoggedIn ? (
        // User is logged in, redirecting to OrderPage
        <p>Redirecting...</p>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
