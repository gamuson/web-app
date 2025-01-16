require('dotenv').config({ path: './server/.env' });
const path = require('path');

// Depuración para verificar que `.env` se carga correctamente
console.log('Ruta actual:', __dirname); // Muestra la ruta del archivo actual
console.log('Archivo .env cargado desde:', path.resolve(__dirname, '.env')); // Muestra la ruta donde busca el archivo .env
console.log('MONGO_URI:', process.env.MONGO_URI); // Verifica si la variable está definida

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const syncDB = require('./utils/syncDB');

const app = express();
const puertoFijo = process.env.PORT || 5000;


// Middleware para CORS
app.use(cors({
  origin: ['https://web-app-j2gq.vercel.app'], // URL de tu frontend
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
  syncDB();
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
