import React from 'react';
import { useAuth } from '../context/AuthContext';

function UserProfileView() {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>
        <strong>Nombre:</strong>
        {' '}
        {user.username}
      </p>
      <p>
        <strong>Email:</strong>
        {' '}
        {user.email}
      </p>
      <p>
        <strong>Rol:</strong>
        {' '}
        {user.role === 'admin' ? 'Administrador' : 'Usuario'}
      </p>
    </div>
  );
}

export default UserProfileView;
