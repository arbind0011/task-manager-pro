const Task = require('../models/Task'); // Adjust the path if necessary

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    // Create a new task and explicitly set the user to the logged-in user's ID
    const task = await Task.create({ 
      ...req.body, 
      user: req.user.id 
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Start building the query to fetch tasks belonging to the logged-in user
    let query = Task.find({ user: req.user.id });

    // Enhancement: Filter by status if provided in the query string (e.g., ?status=Completed)
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    // Enhancement: Sort by a specific field if provided (e.g., ?sortBy=dueDate)
    if (req.query.sortBy) {
      query = query.sort(req.query.sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort: newest first
    }

    // Execute the query
    const tasks = await query;

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure the logged-in user owns the task before updating
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Returns the updated document and runs schema validation
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure the logged-in user owns the task before deleting
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this task' });
    }

    // Delete the task
    await task.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};