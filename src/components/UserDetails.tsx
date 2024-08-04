import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserDTO {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  role: string;
}

interface UserDetailsProps {
  token: string;
}

interface DecodedToken {
  exp: number;
  sub: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ token }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Stored Token:', token); // Debugging log

        if (!token) {
         // setResponseMessage("Please login to view profile");
          setError('No token found');
          return;
        }

        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        console.log(currentTime);

        if (decodedToken.exp < currentTime) {
          setError('Token has expired');
          localStorage.removeItem('authToken');
          return;
        }

        const response = await axios.get<UserDTO>('http://localhost:8080/api/users/user-details', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setUser(response.data);
          setIsAdmin(response.data.role === 'ADMIN');
        } else {
          setError('Failed to fetch user details');
        }
      } catch (error) {
        setError('Error fetching user details');
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      {user ? (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">User Details</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>User ID:</strong> {user.userId}</li>
              <li className="list-group-item"><strong>First Name:</strong> {user.firstName}</li>
              <li className="list-group-item"><strong>Last Name:</strong> {user.lastName}</li>
              <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
              <li className="list-group-item"><strong>Phone Number:</strong> {user.phoneNumber}</li>
              <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Loading user details...</div>
      )}

      {isAdmin && (
        <div className="mt-4">
          <Link to='/admin' className="btn btn-primary">Go to Admin Panel</Link>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
