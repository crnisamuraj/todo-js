require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

//MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to mongoDB'));

//JSON Middleware
app.use(express.json());

//CORS enable
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Router
//UserRouter
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);

//TaskRouter
const taskRouter = require('./routes/task');
app.use('/api/task', taskRouter);

//Error Middleware
// const { handleError } = require('./utils/error');
// app.use((err, req, res, next) => {
// 	handleError(err,res);
// });
app.use((err, req, res, next) => {
	console.log('error middleware');
	console.error(err);
	res.status(err.status).json({ error: err.message });
});


//Start-Server

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`server is alive on port ${port}`);
});