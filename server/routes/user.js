const express = require('express');
const {
  getNotifications,
  getTransactions,
  markNotificationRead, // Asegúrate de importar esta función
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas protegidas del usuario
router.get('/notifications', protect, getNotifications);
router.get('/transactions', protect, getTransactions);
router.put('/notifications/:id', protect, markNotificationRead); // Corregido: ahora está definido

module.exports = router;
