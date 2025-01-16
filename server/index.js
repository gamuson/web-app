require('dotenv').config({ path: './server/.env' });
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const syncDB = require('./utils/syncDB');
const logger = require('./logger');

const app = express();
const puertoFijo = process.env.PORT || 5000;

// Depuración para verificar que `.env` se carga correctamente
logger.info('Ruta actual:', __dirname);
logger.info(`Archivo .env cargado desde: ${path.resolve(__dirname, '.env')}`);
logger.info(`MONGO_URI: ${process.env.MONGO_URI}`);

// Middleware para CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Configurar URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true, // Permitir cookies o credenciales
}));

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
connectDB()
  .then(() => logger.info('Conexión a MongoDB Atlas exitosa'))
  .catch((error) => {
    logger.error(`Error al conectar con MongoDB: ${error.message}`);
    process.exit(1);
  });

// Sincronización de base de datos (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
  syncDB();
}

// Logs para todas las solicitudes entrantes
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Ruta raíz para confirmar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Manejador de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(puertoFijo, () => {
  logger.info(`Servidor corriendo en el puerto ${puertoFijo}`);
});
