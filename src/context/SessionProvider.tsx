import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface SessionContextType {
  loggedInUser: any;
}

const SessionContext = createContext<SessionContextType | null>(null);

function SessionProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get('/success');
        const userDetails = response.data;
        setLoggedInUser(userDetails);
        Cookies.set('loggedInUser', userDetails, { expires: 1 });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchSessionDetails();
  }, []);

  return (
    <SessionContext.Provider value={{ loggedInUser }}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export { SessionProvider, useSession };
