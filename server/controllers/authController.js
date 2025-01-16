const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../logger');

// Generar token JWT
const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  logger.info(`Token generado para usuario ID: ${id}, Rol: ${role}`);
  return token;
};

// Registro de usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.warn('Intento de registro con un email ya existente');
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    if (req.body.role && req.body.role === 'admin') {
      logger.warn('Intento de asignar rol de administrador desde el frontend');
      return res.status(403).json({ message: 'No tienes permiso para asignar roles de administrador.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    logger.info(`Usuario registrado: ${user.username}`);
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    logger.error(`Error al registrar usuario: ${error.message}`);
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn('Intento de inicio de sesión con credenciales inválidas');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    logger.info(`Usuario autenticado: ${user.username}`);
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    logger.error(`Error al iniciar sesión: ${error.message}`);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
