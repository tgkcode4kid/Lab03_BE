const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create new task
router.post('/', async (req, res) => {
  const task = new Task({ description: req.body.description });
  await task.save();
  res.status(201).json(task);
});

// Mark complete
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
