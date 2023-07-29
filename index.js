const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Task = require('./models/task');
const db = require('./DB');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// GET ALL TASKS
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// CREATE NEW TASK
app.post('/tasks', async (req, res) => {
  try {
    const taskData = req.body;
    const task = new Task(taskData);
    await task.save();

    // Save the history for the task creation
    task.history.push({
      date: new Date(),
      type: 'created',
    });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
});

// UPDATION
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Save the current data as history before updating the task
    task.history.push({
      date: new Date(),
      type: 'edited',
    });
    await task.save();

    // Update the task with the new data
    task.title = updates.title;
    task.description = updates.description;
    task.dueDate = updates.dueDate;
    task.priority = updates.priority;
    task.status = updates.status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
});

// GET HISTORY LOG
app.get('/tasks/:id/history', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task.history);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching history log' });
  }
});

// DELETION
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});