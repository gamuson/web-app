import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAdminTransactions } from '../services/adminService';
import AdminTransactionMonitor from '../components/Admin/AdminTransactionMonitor';

function AdminDashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const handleUserTransactions = async (userId) => {
    try {
      const token = user?.token;
      if (!token) throw new Error('No autorizado');

      const transactionsData = await getAdminTransactions(userId, token);
      setTransactions(transactionsData);
    } catch (err) {
      setError(err.message || 'Error al cargar transacciones');
    }
  };

  return (
    <div>
      <h1>Bienvenido, Administrador {user?.username}</h1>
      <AdminTransactionMonitor transactions={transactions} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AdminDashboard;
