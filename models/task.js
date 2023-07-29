const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  status: { type: String, enum: ['to-do', 'in-progress', 'completed'], default: 'to-do' },
  createdAt: { type: Date, default: Date.now },
  history: [
    {
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;