import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const UserDetails: React.FC<UserDetailsProps> = ({ token }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get<UserDTO>('http://localhost:8080/api/users/user-details', {
          headers: {
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
    <div>
      {user ? (
        <div>
          <p>User ID: {user.userId}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Username: {user.username}</p>
          <p>Phone Number: {user.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
