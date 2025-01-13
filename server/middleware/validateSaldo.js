// **server/middleware/validateSaldo.js**

// Middleware para validar que el saldo no sea negativo
module.exports = (req, res, next) => {
    const { amount } = req.body;
  
    // Validar que amount no sea negativo
    if (amount < 0) {
      return res.status(400).json({ message: 'El monto no puede ser negativo.' });
    }
  
    next(); // Continuar si pasa la validación
  };