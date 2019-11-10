require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const fortune = require("fortune-cookie");
const mongoose = require("mongoose");

const connection = mongoose.connection;

module.exports = {
    textSubscribers: function() {
        connection.db.collection('twilio', function(err, collection) {
            collection.find({}).toArray(function(err, data) {
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
            });
        });
    }
}