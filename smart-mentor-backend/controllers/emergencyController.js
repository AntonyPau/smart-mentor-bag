const User = require('../models/User');
const SmsQueue = require('../models/SmsQueue');
// const { sendEmail } = require('../services/emailService');  // <-- comment out

exports.triggerEmergency = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Email sending disabled for now
    /*
    await sendEmail(
      user.parentEmail,
      '🚨 Emergency Alert from Smart Mentor Bag',
      `Your child ${user.username} triggered an emergency alert. Please contact them immediately.`
    );
    */

    // Queue SMS (still works)
    await SmsQueue.create({
      userId: user._id,
      phone: user.parentPhone,
      message: `Emergency alert from ${user.username}!`
    });

    res.json({ success: true, message: 'Emergency alert sent (SMS queued, email disabled)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};