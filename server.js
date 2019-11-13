const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const users = require("./routes/user");
const twilio = require("./routes/twilio");
require("dotenv").config();
const cors = require("cors");
const { textSubscribers } = require("./twilio");

// Cors
const whitelist = ['http://localhost:3000', 'http://app.thereisnotenough.space'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
}

app.use(cors(corsOptions));

app.use(passport.initialize());
require('./passport')(passport);

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

app.use('/api/users', users);
app.use('/api/twilio', twilio);

app.get('/', function(req, res) {
	res.send('Backend for <a href="http://app.thereisnotenough.space">this website</a>');
});

// Run server
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port}`));