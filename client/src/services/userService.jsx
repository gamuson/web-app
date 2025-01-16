const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getUserTransactions = async (token) => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las transacciones del usuario.');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en getUserTransactions: ${error.message}`);
    throw error;
  }
};

export const getUserNotifications = async (token) => {
  try {
    const response = await fetch(`${API_URL}/notifications`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las notificaciones del usuario.');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en getUserNotifications: ${error.message}`);
    throw error;
  }
};
