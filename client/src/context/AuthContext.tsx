import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserRole } from '../types';
import axios from 'axios';
import { API_URL } from '../config';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setAuthState({
            ...initialState,
            isLoading: false,
          });
          return;
        }
        
        // In a real app, we would verify the token with the server
        // For now, simulate a check with a mock user
        // This would normally be an API call: await axios.get(`${API_URL}/auth/me`)
        
        // Mock response for demo purposes
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: UserRole.ADMIN,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setAuthState({
          isAuthenticated: true,
          user: mockUser,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: 'Authentication failed. Please log in again.',
        });
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      // const { token, user } = response.data;
      
      // Mock successful login
      if (email === 'admin@example.com' && password === 'password') {
        const mockToken = 'mock-jwt-token';
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: UserRole.ADMIN,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        localStorage.setItem('token', mockToken);
        
        setAuthState({
          isAuthenticated: true,
          user: mockUser,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // In a real app, this would be an actual API call
      // const response = await axios.post(`${API_URL}/auth/register`, {
      //   email, password, firstName, lastName
      // });
      // const { token, user } = response.data;
      
      // Mock successful registration
      const mockToken = 'mock-jwt-token';
      const mockUser: User = {
        id: '2',
        email,
        firstName,
        lastName,
        role: UserRole.EDITOR, // Default role for new users
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('token', mockToken);
      
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // In a real app, this would be an actual API call
      // await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      // Mock successful request
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset request failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (token: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // In a real app, this would be an actual API call
      // await axios.post(`${API_URL}/auth/reset-password`, { token, password });
      
      // Mock successful request
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed. Please try again.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const value = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};