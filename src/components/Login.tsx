import React, { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface LoginData {
  username: string;
  password: string;
}

interface LoginFormProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
}

function LoginForm({ setIsLoggedIn, setToken }: LoginFormProps): JSX.Element {
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (loginData: LoginData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/loginApi', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const loginResponse = response.data;

      if (response.status === 200) {
        if (loginResponse.token) {
          setIsLoggedIn(true);
          localStorage.setItem('authToken', loginResponse.token);
          setToken(loginResponse.token);
          console.log("Login successful!");
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
    <div className="container">
      <h2 className="my-4">Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); login({ username: formUsername, password }); }}>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formUsername}
              onChange={(e) => setFormUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
