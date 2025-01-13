import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import jwtDecode from 'jwt-decode'; // Para decodificar el token JWT
const logger = require('../logger');
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSessionPersistent, setIsSessionPersistent] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);

      // Verificar si el token ha expirado
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken);
      } else {
        logout(); // Eliminar datos si el token expiró
      }
    }
  }, []);

  const login = (token, persistent = false) => {
    const decodedToken = jwtDecode(token);

    setUser(decodedToken);
    setIsSessionPersistent(persistent);

    // Guardar el token según el tipo de sesión
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
      // Realiza una llamada a la API para renovar el token
      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, isSessionPersistent); // Renovar el token
      } else {
        logout(); // Cerrar sesión si la renovación falla
      }
    } catch (error) {
      

      logger.error(`Error al renovar el token: ${error.message}`);

      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        renewToken(); // Renovar el token cada cierto tiempo
      }
    }, 10 * 60 * 1000); // Intentar renovar cada 10 minutos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const contextValue = useMemo(() => ({
  user,
  login,
  logout,
}), [user]);

export const useAuth = () => useContext(AuthContext);
