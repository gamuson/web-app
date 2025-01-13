// **server/tests/admin.test.js**
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');

// Configuración de MongoDB
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Prueba para actualizar saldo de un usuario
describe('PUT /api/admin/update-saldo', () => {
  let adminToken, userId;

  beforeAll(async () => {
    // Crear usuario de prueba
    const user = new User({ username: 'TestUser', email: 'testuser@example.com', password: 'password123' });
    await user.save();
    userId = user._id;

    // Crear administrador de prueba
    const admin = new User({ username: 'AdminUser', email: 'admin@example.com', password: 'admin123', role: 'admin' });
    await admin.save();

    // Obtener token de inicio de sesión del administrador
    const res = await request(app).post('/api/auth/login').send({
      username: 'AdminUser',
      password: 'admin123',
    });
    adminToken = res.body.token;
  });

  it('Debería actualizar el saldo del usuario', async () => {
    const res = await request(app)
      .put('/api/admin/update-saldo')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        userId,
        amount: 100,
        message: 'Bono de bienvenida',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Saldo actualizado exitosamente');
  });
});
