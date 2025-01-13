// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserTransactions } from '../services/adminService';
import BalanceManager from '../components/Admin/BalanceManager';

function AdminDashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const handleUserTransactions = async (userId) => {
    try {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      if (!token) throw new Error('No autorizado');

      const transactionsData = await getUserTransactions(userId, token);
      setTransactions(transactionsData);
    } catch (err) {
      setError(err.message || 'Error al cargar transacciones');
    }
  };

  return (
    <div>
      <h1>Bienvenido, Administrador {user.username}</h1>
      <BalanceManager
        token={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null}
        onSuccess={() => handleUserTransactions(user.username)}
        onError={setError}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <section>
        <h3>Historial de Transacciones</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.date} - Cambio: {transaction.amountChanged} - Total: {transaction.finalBalance} - {transaction.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;