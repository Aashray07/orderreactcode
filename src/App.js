import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RegisterPage from './components/register';
import LoginPage from './components/login';
import OrderPage from './components/OrderPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic here (e.g., API calls, validation, etc.)
    // For this example, let's just simulate a successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <h1>Grocery Ordering App</h1>
        <nav>
          <ul>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/register" disabled={isLoggedIn}>Register</Link>
                </li>
                <li>
                  <Link to="/login" disabled={isLoggedIn}>Login</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/order">Order</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {isLoggedIn && <Route path="/order" element={<OrderPage />} />}
        </Routes>
      </div>
    </Router>
  );
};


export default App;
