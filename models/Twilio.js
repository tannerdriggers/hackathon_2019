const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TwilioSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    }
});
module.exports = Twilio = mongoose.model("twillio", TwilioSchema);