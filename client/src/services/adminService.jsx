// src/services/adminService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const logger = require('../logger');

export const updateUserBalance = async (data, token) => {
  try {
    const response = await fetch(`${API_URL}/update-saldo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el saldo del usuario.');
    }

    return await response.json();
  } catch (error) {
    logger.error(`Error en updateUserBalance: ${error.message}`);
    throw error;
  }
};

export const getUserTransactions = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${userId}`, {
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