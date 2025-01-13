const User = require('../models/User');
const bcrypt = require('bcryptjs');

const initAdmins = async () => {
  const admins = [
    {
      username: process.env.ADMIN1_USERNAME,
      email: process.env.ADMIN1_EMAIL,
      password: process.env.ADMIN1_PASSWORD,
      role: 'admin',
    },
    {
      username: process.env.ADMIN2_USERNAME,
      email: process.env.ADMIN2_EMAIL,
      password: process.env.ADMIN2_PASSWORD,
      role: 'admin',
    },
  ];

  for (const admin of admins) {
    try {
      const existingAdmin = await User.findOne({ email: admin.email });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        await User.create({ ...admin, password: hashedPassword });
        console.log(`Administrador ${admin.username} creado.`);
      } else {
        console.log(`Administrador ${admin.username} ya existe.`);
      }
    } catch (error) {
      console.error(`Error al inicializar administrador ${admin.username}:`, error);
    }
  }
};

module.exports = initAdmins;
