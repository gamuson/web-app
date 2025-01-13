import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate,} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { TransactionProvider } from './context/TransactionContext';
const logger = require('./logger');
// Componente para proteger rutas
function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
 

  logger.info(`Usuario actual: ${JSON.stringify(user)}`);
  // Redirigir a la página de inicio de sesión si no hay usuario autenticado
  if (!user) {
    
    logger.info('Usuario no autenticado. Redirigiendo a /login');
    return <Navigate to="/login" />;
  }

  // Redirigir según el rol del usuario
  if (requiredRole && user.role !== requiredRole) {
    
    logger.info(`Usuario no autorizado para la ruta. Redirigiendo a /${user.role}-dashboard`);
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <TransactionProvider>
          <Router>
            <Routes>
              {/* Redirigir a /login por defecto */}
              <Route path="/" element={<Navigate to="/login" />} />

              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas protegidas */}
              <Route
                path="/user-dashboard"
                element={(
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/admin-dashboard"
                element={(
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                )}
              />
            </Routes>
          </Router>
        </TransactionProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
