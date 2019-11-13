require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const fortune = require("fortune-cookie");
const mongoose = require("mongoose");

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
    
mongoose.set('debug', true);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');

    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 00, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(startTexting, millisTill10);

    function startTexting() {
        setInterval(textSubscribers, 10000);
    }

    // exports.textSubscriber = (id, res) => {
    //     mongoose.connection.db.collection('twilio', function(err, collection) {
    //         collection.findOne({}, {id: id}).toArray(function(err, data) {
    //             if (err) {
    //                 return res.status(400).json({
    //                     response: {
    //                         data: 'User could not be found in the system.'
    //                     }
    //                 });
    //             }
    //             else {
    //                 data.forEach(twilioSubscriber => {
    //                     const rand = Math.round(Math.random(fortune.length) * 250);
    //                     client.messages
    //                         .create({
    //                             body: fortune[rand],
    //                             from: '+12029151649',
    //                             to: twilioSubscriber.phoneNumber
    //                         })
    //                         .then(message => console.log(message.sid))
    //                         .catch(err => {
    //                             console.log(err);
    //                             return res.status(400).json({
    //                                 response: {
    //                                     data: 'Something went wrong when trying to text you.'
    //                                 }
    //                             });
    //                         })
    //                         .done();
    //                 });
    //             }
    //         });
    //     })
    // };

    function textSubscribers() {
        mongoose.connection.db.collection('twilio', function(err, collection) {
            collection.find({}).toArray(function(err, data) {
                if (err) {
                    console.log("There was an error finding the twilio collection: ", err);
                }
                else {
                    data.forEach(twilioSubscriber => {
                        const rand = Math.round(Math.random(fortune.length) * 250);
                        client.messages
                            .create({
                                body: fortune[rand],
                                from: '+12029151649',
                                to: twilioSubscriber.phoneNumber
                            })
                            .then(message => console.log(message.sid))
                            .catch(err => console.log(err))
                            .done();
                    });
                }
            });
        })
    };
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});