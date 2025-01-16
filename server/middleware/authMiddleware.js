const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../logger');

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      logger.info(`Usuario autenticado: ${req.user.username}`);
      next();
    } else {
      const error = new Error('No autorizado, sin token');
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    logger.error(`Error de autenticación: ${error.message}`);
    res.status(401).json({ message: error.message || 'No autorizado' });
  }
};

// Middleware para verificar rol de administrador
const admin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    logger.info('Acceso autorizado para administrador');
    next();
  } else {
    const error = new Error('Acceso denegado, no eres administrador');
    error.statusCode = 403;
    next(error);
  }
};

module.exports = { protect, admin };
