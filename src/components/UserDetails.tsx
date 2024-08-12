import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from '../context/UserContext';

const UserDetails = () => {
  const { user, isAdmin, error } = useUserContext();

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
