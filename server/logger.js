const { createLogger, format, transports } = require('winston');

// Configuración de transportes basada en el entorno
const isProduction = process.env.NODE_ENV === 'production';

const transportsList = [
  new transports.Console(), // Siempre usa la consola para los logs
];

// Configuración del logger
const logger = createLogger({
  level: 'info', // Nivel mínimo de logs (info, warn, error, etc.)
  format: format.combine(
    format.timestamp(), // Agregar timestamp a los logs
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
  ),
  transports: transportsList, // Solo consola en producción
});

module.exports = logger;
