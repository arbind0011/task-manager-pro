// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Define the schema with name, email, and password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures no two users can register with the same email
  },
  password: {
    type: String,
    required: true
  }
});

// 3. Export the model
module.exports = mongoose.model('User', userSchema);