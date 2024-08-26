import React, { createContext, useState, ReactNode } from 'react';

interface UserType {

}
interface UserContextType {
    user: UserType;
    updateUser: (key: string, value: any) => void;
    clearUser: () => void;
}

// Create the context with default values.
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [user, setUser] = useState({});

    const updateUser = (key: string, value: any) => {
        setUser(prevUser => ({
            ...prevUser,
            [key]: value,
        }));
    };

    const clearUser = () => {
        setUser({});
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;
