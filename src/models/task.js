const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	state: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Task', taskSchema);