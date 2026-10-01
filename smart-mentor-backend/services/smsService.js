const SmsQueue = require('../models/SmsQueue');

// Called by Arduino to fetch pending SMS
exports.getPendingSms = async (req, res) => {
  try {
    const { userId } = req.query;
    const pending = await SmsQueue.find({ userId, status: 'pending' }).sort('createdAt');
    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Called by Arduino to mark SMS as sent
exports.markSmsSent = async (req, res) => {
  try {
    const { id } = req.body;
    await SmsQueue.findByIdAndUpdate(id, { status: 'sent' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};