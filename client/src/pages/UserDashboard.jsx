import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { getUserTransactions } from '../services/userService';
 const logger = require('../logger');
function UserDashboard() {
  const { user } = useAuth();
  const { notifications, unreadCount, loadNotifications } = useNotifications();
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      const token = user?.token;
      if (!token) return;

      try {
        loadNotifications(token);
        const transactionsData = await getUserTransactions(token);
        setTransactions(transactionsData);
      } catch (error) {
        

        logger.error(`Error al cargar datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, loadNotifications]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h1>
        Bienvenido,
        {user.username}
      </h1>
      <h2>
        Tu saldo es:
        {user.balance}
        {' '}
        Pñz
      </h2>

      <section>
        <h3>
          Notificaciones (
          {unreadCount}
          {' '}
          sin leer)
        </h3>
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              {notification.message}
              {' '}
              -
              {notification.read ? 'Leída' : 'No leída'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Transacciones</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.date}
              {' '}
              - Cambio:
              {transaction.amountChanged}
              {' '}
              - Total:
              {transaction.finalBalance}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default UserDashboard;
