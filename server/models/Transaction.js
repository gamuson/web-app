const mongoose = require('mongoose');

// Esquema de transacciones
const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  initialBalance: {
    type: Number,
    required: true,
  },
  amountChanged: {
    type: Number,
    required: true,
  },
  finalBalance: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
