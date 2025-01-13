const API_URL = '/api/user';
const logger = require('../logger');
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
   

    logger.error(`Error en getUserNotifications: ${error.message}`);
    throw error;
  }
};

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
    

    logger.error(`Error en getUserTransactions: ${error.message}`);
    throw error;
  }
};
