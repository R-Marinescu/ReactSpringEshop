import React, { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

interface LoginData {
  username: string;
  password: string;
}

interface LoginFormProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  onRequestClose: () => void;
  isOpen: boolean;
}

function LoginForm({ setIsLoggedIn, onRequestClose, isOpen }: LoginFormProps): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (loginData: LoginData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/loginApi', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const loginResponse = response.data;
      console.log(loginResponse);
      if (response.status === 200) {
        if (loginResponse.token) {
          setIsLoggedIn(true);
          localStorage.setItem('authToken', loginResponse.token); // Example: store token in localStorage
          console.log("Login succesfull!");
        } else {
          console.error("Login response missing token:", loginResponse);
        }
      } else {
        console.error('Login failed:', loginResponse.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <h2>Login</h2>
        <p>Username:</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <p>Password:</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => login({ username, password })}>Login</button>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default LoginForm;
