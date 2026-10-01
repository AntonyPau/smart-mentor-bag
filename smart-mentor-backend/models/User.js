const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will be hashed
  parentEmail: String,
  parentPhone: String,
  class: String,
  division: String
});

module.exports = mongoose.model('User', userSchema);