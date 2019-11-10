const express = require('express');
const router = express.Router();

const Twilio = require('../models/Twilio');

router.route('/register', function (req, res) {
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    Twilio.findOne({ email })
        .then(twilio => {
            if (twilio && twilio.phoneNumber === phoneNumber) {
                return res.status(400).json({
                    email: 'Already registered.'
                });
            } else {
                const twilioUser = new Twilio({
                    email: email,
                    phoneNumber: phoneNumber
                });

                twilioUser
                    .save()
                    .then(twilioUser => {
                        res.json(twilioUser);
                    });
            }
        });
});

router.route('/unregister', function (req, res) {
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    Twilio.findOne({ email })
        .then(twilio => {
            if (twilio && twilio.phoneNumber === phoneNumber) {
                twilio
                    .remove()
                    .then(done => {
                        res.json(done);
                    });
            } else {
                return res.status(400).json({
                    email: 'No Phone Number to remove.'
                });
            }
        });
});

module.exports = router;