import React from 'react';

function NotificationList({ notifications }) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <h2>
        Notificaciones (
        {unreadCount}
        {' '}
        sin leer)
      </h2>
      {notifications.map((notification) => (
        <div
          key={notification._id}
          style={{ fontWeight: notification.read ? 'normal' : 'bold' }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}

export default NotificationList;
