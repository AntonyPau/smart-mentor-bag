const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rfidTag: { type: String, required: true },
  action: { type: String, enum: ['taken', 'returned'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);