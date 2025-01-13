// src/components/Admin/BalanceManager.jsx
import React, { useState } from 'react';
import { updateUserBalance } from '../../services/adminService';
const logger = require('../../logger');

const BalanceManager = ({ token, onSuccess, onError }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleBalanceUpdate = async () => {
    if (!selectedUser || !amount || !message) {
      onError('Por favor, complete todos los campos.');
      return;
    }

    try {
      await updateUserBalance({ userId: selectedUser, amount: parseFloat(amount), message }, token);
      alert('Saldo actualizado correctamente');
      setAmount('');
      setMessage('');
      onSuccess();
    } catch (err) {
      logger.error(`Error al actualizar el saldo: ${err.message}`);
      onError(err.message || 'Error al actualizar el saldo.');
    }
  };

  return (
    <section>
      <h3>Gestión de Saldo</h3>
      <input
        type="text"
        placeholder="ID del Usuario"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <textarea
        placeholder="Mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleBalanceUpdate}>Actualizar Saldo</button>
    </section>
  );
};

export default BalanceManager;