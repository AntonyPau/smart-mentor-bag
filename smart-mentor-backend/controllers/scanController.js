const Scan = require('../models/Scan');
const Book = require('../models/Book');
const { updateStatus } = require('./bookController');

// Endpoint for Arduino to report a scan
exports.reportScan = async (req, res) => {
  try {
    const { rfid, action } = req.body;
    // For now, assume a default user (you'll implement authentication later)
    // In production, you'd identify the user via API key or JWT from the hardware
    const userId = req.user?.id || 'some-default-user-id';

    // Log the scan
    await Scan.create({ userId, rfidTag: rfid, action });

    // Update in-memory status
    updateStatus(rfid, action);

    // Optional: check timetable and return instructions for audio feedback
    // For now just acknowledge
    res.json({ success: true, message: 'Scan recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};