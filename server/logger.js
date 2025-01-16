const { createLogger, format, transports } = require('winston');

// Configurar el logger
const logger = createLogger({
  level: 'info', // Nivel mínimo de logs que se mostrarán (info, warn, error, etc.)
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
  ),
  transports: [
    new transports.Console(), // Mostrar logs en la consola
    new transports.File({ filename: 'logs/app.log' }), // Guardar logs en un archivo
  ],
});

// Exportar el logger
module.exports = logger;
