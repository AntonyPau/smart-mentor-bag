const Book = require('../models/Book');
// In-memory store for quick status lookup (key: rfidTag, value: 'present'/'missing')
// In production you'd use Redis or derive from scans
let bookStatus = new Map();

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const booksWithStatus = books.map(book => ({
      ...book.toObject(),
      status: bookStatus.get(book.rfidTag) || 'present' // default present if never scanned
    }));
    res.json(booksWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Called by scan controller to update status
exports.updateStatus = (rfid, action) => {
  bookStatus.set(rfid, action === 'taken' ? 'missing' : 'present');
};