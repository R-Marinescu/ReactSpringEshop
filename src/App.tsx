import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/Login';
import RegisterForm from './components/RegisterForm';
import UserDetails from './components/UserDetails';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
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
        handleLogout();
      }
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <div className="container mt-4">
        {isLoggedIn && <p className='alert alert-success'>Welcome, {username || localStorage.getItem('username')}!</p>}
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">MyApp</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user-details" className="nav-link">Profile</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/products' className="nav-link">Products</Link>
                </li>
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setToken={setToken} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-details" element={token ? <UserDetails token={token} /> : <p>Please log in to view your profile.</p>} />
          <Route path="/product/:productId" element={<ProductDetailsWrapper />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component to handle route params
const ProductDetailsWrapper = () => {
  const { productId } = useParams<{ productId: string }>();

  return <ProductDetails productId={Number(productId)} />;
};

export default App;
