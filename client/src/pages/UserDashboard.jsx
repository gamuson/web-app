import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useTransactions } from '../context/TransactionContext';
import UserTransactionList from '../components/User/UserTransactionList';

function UserDashboard() {
  const { user } = useAuth();
  const { notifications, unreadCount, loadNotifications } = useNotifications();
  const { transactions, loadTransactions } = useTransactions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = user?.token;
      if (!token) return;

      try {
        await loadNotifications(token);
        await loadTransactions(token);
      } catch (error) {
        console.error(`Error al cargar datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, loadNotifications, loadTransactions]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user?.username}</h1>
      <h2>
        Tu saldo es:
        {user?.balance} Pñz
      </h2>

      <section>
        <h3>Notificaciones ({unreadCount} sin leer)</h3>
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              {notification.message} - {notification.read ? 'Leída' : 'No leída'}
            </li>
          ))}
        </ul>
      </section>

      <UserTransactionList transactions={transactions} />
    </div>
  );
}

export default UserDashboard;
