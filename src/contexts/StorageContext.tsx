import React, { createContext, useState, ReactNode } from 'react';
interface StorageType {
    token: string | null,
}
interface StorageContextType {
    storage: StorageType;
    updateStorage: (key: string, value: string) => void;
    clearStorage: () => void;
}

// Create the context with default values.
export const StorageContext = createContext<StorageContextType | undefined>(undefined);

interface StorageProviderProps {
    children: ReactNode;
}

const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {

    const [storage, setStorage] = useState({
        token: sessionStorage.getItem('authToken') || localStorage.getItem('authToken'),
    });

    const updateStorage = (key: string, value: string) => {
        sessionStorage.setItem(key, value);
        setStorage(prevStorage => ({
            ...prevStorage,
            [key]: value,
        }));
    };

    const clearStorage = () => {
        sessionStorage.clear();
        setStorage({
            token: null,
        });
    };

    return (
        <StorageContext.Provider value={{ storage, updateStorage, clearStorage }}>
            {children}
        </StorageContext.Provider>
    )
};

export default StorageProvider;
