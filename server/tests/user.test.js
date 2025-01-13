// **server/tests/user.test.js**
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Configuración de MongoDB
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Prueba para obtener notificaciones
describe('GET /api/user/notifications', () => {
  let token;

  beforeAll(async () => {
    // Crear usuario de prueba
    const user = new User({ username: 'TestUser', email: 'testuser@example.com', password: 'password123' });
    await user.save();

    // Crear notificación de prueba
    const notification = new Notification({ user: user._id, message: 'Nueva notificación' });
    await notification.save();

    // Obtener token de inicio de sesión
    const res = await request(app).post('/api/auth/login').send({
      username: 'TestUser',
      password: 'password123',
    });
    token = res.body.token;
  });

  it('Debería obtener notificaciones del usuario', async () => {
    const res = await request(app)
      .get('/api/user/notifications')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('message', 'Nueva notificación');
  });
});
