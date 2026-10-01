const express = require('express');
const { reportScan } = require('../controllers/scanController');
// Optional: protect this route with an API key for hardware
const router = express.Router();

router.post('/', reportScan); // Hardware calls this

module.exports = router;
