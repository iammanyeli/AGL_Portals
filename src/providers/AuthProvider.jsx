import React, { createContext, useState } from 'react';
import * as authService from '../services/__mocks__/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signup = async (fullName, email, password) => {
    const userData = await authService.signup(fullName, email, password);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;