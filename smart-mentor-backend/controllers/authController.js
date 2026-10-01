const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    let { username, password, parentEmail, parentPhone, class: cls, division } = req.body;

    // Ensure parentPhone has country code (+91)
    if (parentPhone && !parentPhone.startsWith('+')) {
      parentPhone = '+91' + parentPhone;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      parentEmail,
      parentPhone,
      class: cls,
      division
    });
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Send back the full user object (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        parentEmail: user.parentEmail,
        parentPhone: user.parentPhone,  // now includes +91 if added
        class: user.class,
        division: user.division
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
