import React, { useState } from 'react';
import { FormEvent } from 'react';
import Modal from 'react-modal';

interface RegisterFormProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

const RegisterForm = ({onRequestClose, isOpen}: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phoneNumber: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Prepare data for registration API call
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      phoneNumber: formData.phoneNumber
    };

    try {
      // Send POST request to your Spring Boot API endpoint for registration
      const response = await fetch('http://localhost:8080/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error('Registration failed: ' + (await response.text()));
      }

      // Handle successful registration (e.g., redirect to login page)
      console.log('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      // Display error message to user
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <button onClick={onRequestClose}>Close</button>
      </Modal>
    </div>
  );
};

export default RegisterForm;
