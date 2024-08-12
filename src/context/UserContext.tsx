import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import React from "react";

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

interface UserContextProps {
    user: UserDTO | null;
    isAdmin: boolean;
    error: string | null;
    fetchUserDetails: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

        const fetchUserDetails = async () => {
            try {
                const storedToken = localStorage.getItem('authToken');
                
                if (!storedToken) {     
                    setError('No token found in UserContext');
                    return;
                }

                const decodedToken: DecodedToken = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    setError('Token has expired');
                    localStorage.removeItem('authToken');
                    return;
                }

                const response = await axios.get<UserDTO>('http://localhost:8080/api/users/user-details', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
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

        useEffect(() => {
            fetchUserDetails();
          }, []);

    return (
        <UserContext.Provider value={{ user, isAdmin, error, fetchUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};
