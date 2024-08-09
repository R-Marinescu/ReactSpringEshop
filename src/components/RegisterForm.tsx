import React, { useState } from 'react';
import { FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phoneNumber: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      phoneNumber: formData.phoneNumber
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error('Registration failed: ' + (await response.text()));
      }

      console.log('Registration successful!');
    } catch (err) {
      const error = err as Error;
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4 text-center">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
