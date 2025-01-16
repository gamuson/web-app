import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
const logger = require('../logger');
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSessionPersistent, setIsSessionPersistent] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken);
      } else {
        logout();
      }
    }
  }, []);

  const login = (token, persistent = false) => {
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    setIsSessionPersistent(persistent);

    if (persistent) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  const renewToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, isSessionPersistent);
      } else {
        logger.warn('Renovación de token fallida, cerrando sesión');
        logout();
      }
    } catch (error) {
      logger.error(`Error al renovar el token: ${error.message}`);
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) renewToken();
    }, 10 * 60 * 1000); // Cada 10 minutos

    return () => clearInterval(interval);
  }, [user]);

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
