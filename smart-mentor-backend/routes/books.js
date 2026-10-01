const express = require('express');
const { getAllBooks } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getAllBooks);

module.exports = router;