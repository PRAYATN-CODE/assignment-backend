const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//user creating a task on prayatn soni backend project
router.post('/add', async (req, res) => {
    try {
        const { task, completed } = req.body;
        if (!task) {
            return res.status(400).json({ error: 'Task field is required' });
        }
        const newTodo = new Todo({ task, completed });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task', details: error.message });
    }
});

router.get('/fetch', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;

        if (completed === undefined) {
            return res.status(400).json({ error: 'Task or completed field is required' });
        }

        const updatedTodo = await Todo.updateOne(
            { _id: id }, // Query condition
            { $set: { completed } }
        );
        if (updatedTodo.modifiedCount === 0) {
            return res.status(404).json({ error: 'Already up to date' });

        }
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: "Task updated successfully", updatedTodo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task', details: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task', details: error.message });
    }
});

module.exports = router;
