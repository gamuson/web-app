const express = require('express');
const {
  updateBalance,
  getUserTransactions,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/update-saldo', protect, admin, updateBalance);
router.get('/transactions/:userId', protect, admin, getUserTransactions);

module.exports = router;
