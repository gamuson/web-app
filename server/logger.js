const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

// Ruta al directorio de logs
const logDir = path.join(__dirname, 'logs');

// Verifica si el directorio existe, si no, lo crea
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configura los transportes según el entorno
const transportsList = [
  new transports.Console(), // Siempre muestra los logs en la consola
];

// En entornos que no son producción, guarda los logs en un archivo
if (process.env.NODE_ENV !== 'production') {
  transportsList.push(new transports.File({ filename: path.join(logDir, 'app.log') }));
}

// Configura el logger
const logger = createLogger({
  level: 'info', // Nivel mínimo de logs (info, warn, error, etc.)
  format: format.combine(
    format.timestamp(), // Añade timestamp a los logs
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
  ),
  transports: transportsList, // Transportes definidos según el entorno
});

module.exports = logger;
