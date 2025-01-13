require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
const puertoFijo = process.env.PORT || 5000;


// Middleware para CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Usar FRONTEND_URL o localhost como fallback
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permitir cookies o credenciales
}));



// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
connectDB()
  .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
  .catch((error) => {
    console.error('Error al conectar con MongoDB:', error.message);
    process.exit(1);
  });

// Logs para todas las solicitudes entrantes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Manejador de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(puertoFijo, () => {
  console.log(`Servidor corriendo en el puerto ${puertoFijo}`);
});
