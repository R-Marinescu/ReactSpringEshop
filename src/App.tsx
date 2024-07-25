import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/Login';
import RegisterForm from './components/RegisterForm';
import UserDetails from './components/UserDetails';
import './Css/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub) {
          setUsername(decodedToken.sub);
          localStorage.setItem('username', decodedToken.sub);
          setIsLoggedIn(true);
        } else {
          console.error("No username in token:", decodedToken);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setToken(null);
        localStorage.removeItem('authToken');
      }
    }
  }, [token]);

  return (
    <Router>
      <div>
        {isLoggedIn && <p>Welcome, {username || localStorage.getItem('username')}!</p>}
        <nav>
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/register" className="nav-button">Register</Link>
          <Link to="/user-details" className="nav-button">Profile</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setToken={setToken} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-details" element={token ? <UserDetails token={token} /> : <p>Please log in to view your profile.</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




