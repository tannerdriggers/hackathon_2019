const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TwilioSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	id: {
		type: String,
		required: true
	},
	phoneNumber: {
        type: String,
        required: true
    }
});
module.exports = Twilio = mongoose.model("twilio", TwilioSchema);