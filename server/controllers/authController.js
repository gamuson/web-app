const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generar token JWT
const generateToken = (id, role) => {
  console.log('Token generado:', token);
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Registro de usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Prohibir la creación de administradores desde el frontend
    if (req.body.role && req.body.role === 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para asignar roles de administrador.' });
    }

    // Encriptar contraseña y registrar usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user', // Rol asegurado como usuario por defecto
    });

    // Enviar respuesta con token
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  console.log('Solicitud de inicio de sesión:', req.body);

  const { email, password } = req.body; // Cambiado de username a email para alinearse con el frontend

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    console.log('Usuario encontrado:', user);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Credenciales inválidas');
     
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Enviar respuesta con token
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
