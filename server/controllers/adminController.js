// **server/controllers/adminController.js**
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');

// Actualizar saldo
exports.updateBalance = async (req, res) => {
  const { userId, amount, message } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const initialBalance = user.balance;
    const finalBalance = initialBalance + amount;
    if (finalBalance < 0) return res.status(400).json({ message: 'El saldo no puede ser negativo' });

    user.balance = finalBalance;
    await user.save();

    const transaction = new Transaction({
      user: user._id,
      initialBalance,
      amountChanged: amount,
      finalBalance,
      message,
    });
    await transaction.save();

    const notification = new Notification({
      user: user._id,
      message: `Tu saldo ha sido actualizado. Saldo actual: ${finalBalance}`,
    });
    await notification.save();

    res.status(200).json({ message: 'Saldo actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar saldo', error });
  }
};

// Obtener transacciones de un usuario
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones del usuario', error });
  }
};
