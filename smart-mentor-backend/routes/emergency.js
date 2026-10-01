const express = require('express');
const { triggerEmergency } = require('../controllers/emergencyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, triggerEmergency);

module.exports = router;
