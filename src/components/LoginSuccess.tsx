import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RedirectPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');
    const token = params.get('token');

    useEffect(() => {
        // Handle redirection and user details
        console.log('Redirected user:', username);
        console.log('Session token:', token);
        // You can store the session token in local storage or state for future use
    }, [username, token]);

    return (
        <div>
            <h2>Redirect Page</h2>
            {/* Add any UI elements or logic here */}
        </div>
    );
}

export default RedirectPage;
