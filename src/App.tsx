import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './components/Login';
import RenderCompBtn from './components/RenderCompBtn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleOpenLoginForm = () => {
    setIsOpen(true);
  };

  return (
    <Router>
      <div>
        <RenderCompBtn label="Login" onClick={handleOpenLoginForm} />
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;



