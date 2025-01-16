const express = require('express');
const { register, login, generateToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register); // Registro de usuarios
router.post('/login', login);       // Inicio de sesión
router.post('/refresh-token', protect, (req, res) => {
  const token = generateToken(req.user.id, req.user.role);
  res.status(200).json({ token });
});

module.exports = router;
