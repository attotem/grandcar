import React, { createContext, useContext, useEffect, useState } from 'react';
import { Login, logout, isAuthenticated } from '../services/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => Promise<boolean>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await Login();
      setIsLoggedIn(success);
      return success;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggedIn(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const initializeAuth = async () => {
    setIsLoading(true);

    if (isAuthenticated()) {
      setIsLoggedIn(true);
      setIsLoading(false);
      return;
    }

    try {
      const success = await Login();
      setIsLoggedIn(success);
    } catch (error) {
      console.error('Auto-login failed:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login: handleLogin,
        logoutUser: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
