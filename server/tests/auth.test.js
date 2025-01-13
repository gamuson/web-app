// **server/tests/auth.test.js**
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

// Configurar MongoDB
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Prueba de registro
describe('POST /api/auth/register', () => {
  it('Debería registrar un usuario', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'TestUser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});

// Prueba de inicio de sesión
describe('POST /api/auth/login', () => {
  it('Debería iniciar sesión correctamente', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'TestUser',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
