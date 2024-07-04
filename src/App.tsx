import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/Login';
import RegisterForm from './components/RegisterForm';
import RenderCompBtn from './components/RenderCompBtn';
import UserDetails from './components/UserDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));


  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if(token) {
      const decodedToken  = jwtDecode(token);
      if(decodedToken .sub){
        setUsername(decodedToken.sub);
        localStorage.setItem('username', decodedToken.sub);
        setIsLoggedIn(true);
      }else {
        console.error("No username in toekn:", decodedToken )
      }
    }
  }, [token]);

  const openModal = (type: string) => {
    setFormType(type);
    setIsOpen(true);
  };

  return (
    <Router>
      <div>
      {isLoggedIn && (
  <p>Welcome, {(username || localStorage.getItem('username'))}!</p>
)}
        <RenderCompBtn label="Login" onClick={() => openModal("Login")} />
        <RenderCompBtn label="Register" onClick={() => openModal("Register")}/>
        {formType === "Login" && (
          <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setToken={setToken}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
        )}
        {formType === "Register" && (
          <RegisterForm 
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
        )}
        {token && <UserDetails
          token={token}
        />}
      </div>
    </Router>
  );
}

export default App;



