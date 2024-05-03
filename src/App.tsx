// import React, { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import LoginForm from './components/Login';
// import RenderCompBtn from './components/RenderCompBtn';


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);
  
//   const handleLogin = () => {
//     setShowLoginForm(!showLoginForm); // Toggle visibility
//   }

//   return (
//     <Router>
//       <div>
//       <RenderCompBtn label='Login' onClick={handleLogin}/>
//       {showLoginForm && <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
//       </div>
//     </Router>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; 
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './components/Login'; // Assuming LoginForm is updated (refer to previous response)
import RenderCompBtn from './components/RenderCompBtn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    // Set the root element of your React app as the App element for react-modal
    Modal.setAppElement('#root');
  }, []);

  const handleOpenLoginForm = () => {
    setIsOpen(true); // Open the modal when button is clicked
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



