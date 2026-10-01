const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  rfidTag: { type: String, required: true, unique: true },
  title: String,
  subject: String
});

module.exports = mongoose.model('Book', bookSchema);