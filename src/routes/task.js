const express = require('express');
const router = express.Router();
const task = require('../controllers/task');



//routes - /api/task

router.get('/hello', (req, res) => res.status(200).json({ message: "hello world" }));

router.get('/', task.getTasks, (req, res) => res.json(res.result));

router.post('/', task.saveTask, (req, res) => res.status(201).json(res.task));

router.get('/:id', task.getTask, (req, res) => res.json(res.task));

router.delete('/:id', task.getTask, task.deleteTask, (req, res) => res.json({ message: `deleted item with id: ${req.params.id}`, result: res.result }));

router.patch('/state/:id', task.getTask, task.toggleState, task.getTask, (req, res) => res.json(res.task));



module.exports = router;