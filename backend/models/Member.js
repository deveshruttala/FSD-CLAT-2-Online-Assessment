const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  address: String,
  phone: String,
  email: String,
  degree: String,
  year: String,
  certifications: String,
  about: String,
  hobbies: String,
  image: String
});

module.exports = mongoose.model('Member', memberSchema);
