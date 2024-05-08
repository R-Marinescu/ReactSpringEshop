import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/Login';
import RenderCompBtn from './components/RenderCompBtn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if(token) {
      const decodeToken = jwtDecode(token);
      if(decodeToken.sub){
        setUsername(decodeToken.sub);
      }else {
        console.error("No username in toekn:", decodeToken)
      }
    }
  }, [token]);

  const handleOpenLoginForm = () => {
    setIsOpen(true);
  };

  return (
    <Router>
      <div>
      {isLoggedIn && <p>Welcome, {username}!</p>}
        <RenderCompBtn label="Login" onClick={handleOpenLoginForm} />
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setToken={setToken}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;



