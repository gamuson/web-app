import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const logger = require('../logger');

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    logger.warn('Usuario no autenticado. Redirigiendo a /login.');
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    logger.warn(`Usuario no autorizado para acceder a esta ruta. Redirigiendo a /${user.role}-dashboard.`);
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }

  logger.info(`Acceso concedido a la ruta protegida para el rol: ${user.role}`);
  return children;
}

export default ProtectedRoute;
