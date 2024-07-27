import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

interface UserDTO {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
}

interface UserDetailsProps {
  token: string;
}

interface DecodedToken {
  exp: number;
}

const UserDetails: React.FC<UserDetailsProps> = ({ token }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Stored Token:', token); // Debugging log

        if (!token) {
          setError('No token found');
          return;
        }

        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        console.log(currentTime);

        if(decodedToken.exp < currentTime) {
          setError('Token has epired');
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
            </ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Loading user details...</div>
      )}
    </div>
  );
};


export default UserDetails;
