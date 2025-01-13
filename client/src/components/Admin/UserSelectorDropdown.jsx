import React from 'react';

function UserSelector({ users, selectedUser, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)} value={selectedUser}>
      <option value="">Seleccionar Usuario</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ))}
    </select>
  );
}

export default UserSelector;
