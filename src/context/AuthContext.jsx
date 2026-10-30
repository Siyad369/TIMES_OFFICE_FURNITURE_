import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on first mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('times_admin_token');
      const storedUser = localStorage.getItem('times_admin_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed to parse stored auth user', e);
      localStorage.removeItem('times_admin_token');
      localStorage.removeItem('times_admin_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const data = await authApi.login({ username, password });
    
    // Response: { message, token, username, is_staff }
    const userData = {
      username: data.username,
      is_staff: data.is_staff,
    };

    localStorage.setItem('times_admin_token', data.token);
    localStorage.setItem('times_admin_user', JSON.stringify(userData));

    setToken(data.token);
    setUser(userData);
    return data;
  };

  const logout = async () => {
    try {
      if (token) {
        await authApi.logout();
      }
    } catch (error) {
      console.warn('Backend logout failed or token was already invalid:', error);
    } finally {
      localStorage.removeItem('times_admin_token');
      localStorage.removeItem('times_admin_user');
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

