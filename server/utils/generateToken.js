const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { generateToken } = require('../utils/generateToken');

const router = express.Router();

router.post('/register', registerUser); // Registro de usuarios
router.post('/login', loginUser);       // Inicio de sesión
router.post('/refresh-token', protect, (req, res) => {
  const token = generateToken(req.user.id, req.user.role);
  res.status(200).json({ token });
});

module.exports = router;
