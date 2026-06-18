const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium' // Optional: sets a default if none is provided
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending' // Optional: tasks usually start as pending
  },
  dueDate: {
    type: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Ties the task to the specific user account
  }
});

module.exports = mongoose.model('Task', taskSchema);