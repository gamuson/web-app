const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    console.error(`Error en updateUserBalance: ${error.message}`);
    throw error;
  }
};

export const getAdminTransactions = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/admin/transactions/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las transacciones del usuario para el administrador.');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en getAdminTransactions: ${error.message}`);
    throw error;
  }
};
