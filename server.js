const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const users = require("./routes/user");
require("dotenv").config();


// DB Config
// Connect to MongoDB
mongoose
	.connect(
		process.env.MONGO,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log("Cannot connect to MongoDB: \n" + err));

app.use(passport.initialize());
require('./passport')(passport);

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', function(req, res) {
	res.send('hello');
});

// Run server
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port}`));