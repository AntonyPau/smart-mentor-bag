const express = require('express');
const { getPendingSms, markSmsSent } = require('../services/smsService');
const router = express.Router();

router.get('/pending', getPendingSms);
router.post('/sent', markSmsSent);

module.exports = router;
