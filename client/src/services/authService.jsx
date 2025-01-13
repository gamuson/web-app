const API_URL = '/api/auth';

export const loginService = async (data) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
  }

  return await response.json();
};

export const registerService = async (data) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al registrar usuario. Verifica los datos ingresados.');
  }

  return await response.json();
};
