const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  unlockDate: { type: Date, required: true },
  isUnlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
