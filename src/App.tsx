import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/Login';
import RegisterForm from './components/RegisterForm';
import UserDetails from './components/UserDetails';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import { Container } from "react-bootstrap";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import './Css/App.css';
import useShoppingCart, { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import PaymentConfirmation from './components/PaymentConfirmation';
import ShoppingCartWrapper from './components/ShoppingCartWrapper';
import ProductsCategory from './components/ProductsCategory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [category, setCategory] = useState<string>('');

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
    <UserProvider>
      <ProductProvider>
        <ShoppingCartProvider>
          <Container className="mb-4">
              <div>
                {isLoggedIn && <p className='alert alert-success'>Welcome, {username || localStorage.getItem('username')}!</p>}
                <Navbar isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Home setCategory={setCategory}/>} />
                  <Route path="/About" element={<About />} />
                  <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setToken={setToken} />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/user-details" element={<UserDetails/>} />
                  <Route path="/product/:productId" element={<ProductDetailsWrapper />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/payment-confirmation" element={<PaymentConfirmation/>} />
                  <Route path="/shopping-cart" element={<ShoppingCartWrapper isOpen={true} />} />
                  <Route path="products-category" element={<ProductsCategory category={category} setCategory={setCategory}/>}/>
                </Routes>
              </div>
          </Container>
        </ShoppingCartProvider>
      </ProductProvider>
    </UserProvider>
    
  );
}

const ProductDetailsWrapper = () => {
  const { productId } = useParams<{ productId: string }>();

  return <ProductDetails productId={Number(productId)} />;
};


export default App;
