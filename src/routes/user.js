const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(404).json({message: err.message});
	}
});

router.get('/:id', getUser, (req, res) => {
	res.status(200).json(res.user);
});

router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		channels: req.body.channels
	});
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(400).json({message: err.message});
	}
});

router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name
	}
	if (req.body.channels != null) {
		res.user.channels = req.body.channels;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({message: `user with id: ${res.user.id} deleted`})
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		res.user = user;
	} catch (err) {
		//console.error(err);
		//next(err); pass it to error handler
		return res.status(404).json({message: 'Cannot find user'});
	}
	
	next();
}


module.exports = router;