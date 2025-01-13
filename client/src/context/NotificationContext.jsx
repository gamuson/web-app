import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { getUserNotifications } from '../services/userService';
const logger = require('../logger');
const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async (token) => {
    try {
      const data = await getUserNotifications(token);
      setNotifications(data);
      const unread = data.filter((notif) => !notif.read).length;
      setUnreadCount(unread);
    } catch (error) {
      
      logger.error(`Error al cargar notificaciones: ${error.message}`);
    }
  };

  const markAsRead = async (notificationId, token) => {
    try {
      await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.map((notif) => (notif._id === notificationId ? { ...notif, read: true } : notif)));
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      
      logger.error(`Error al marcar la notificación como leída: ${error.message}`);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications, unreadCount, loadNotifications, markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
const contextValue = useMemo(() => ({
  notifications,
  unreadCount,
  loadNotifications,
  markAsRead,
}), [notifications, unreadCount]);
export const useNotifications = () => useContext(NotificationContext);
