const Task = require('../models/task');

async function getTasks(req, res, next) {
	try {
		let result = await Task.find();
		res.result = result;
	} catch (err) {
		err.status = 500;
		return next(err);
	}
	next();
};

async function saveTask(req, res, next) {
	console.log(req.body);
	let task = new Task({
		title: req.body.title
	});
	try {
		const newTask = await task.save();
		res.task = newTask;
	} catch (err) {
		err.status = 500;
		return next(err);
	}
	next();
};

async function getTask(req, res, next) {
	try {
		let task = await Task.findById(req.params.id);
		if (task !== null ) {
			console.log(task);
			res.task = task;
		} else {
			return res.status(404).json({ message: `user with id: ${req.params.id} not found`});
		}
	} catch (err) {
		err.status = 500
		return next(err);	
	}
	next();
};

async function toggleState(req, res, next) {
	await res.task.updateOne({ state: !res.task.state }, (err, msg) => {
		if (err) {
			err.status = 500;
			return next(err);
		};
		res.result = msg;
		console.log(`result: ${JSON.stringify(msg)}`);
	});
	next();
};

async function deleteTask(req, res, next) {
	await Task.deleteOne({ _id: res.task.id }, (err, msg) => {
		if (err) {
			err.status = 500
			return next(err);
		};
		console.log(msg,res.task);
		res.result = msg;
	});
	next();
};

module.exports = {
	deleteTask,
	toggleState,
	getTask,
	getTasks,
	saveTask
}