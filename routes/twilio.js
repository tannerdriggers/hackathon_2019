const express = require('express');
const router = express.Router();

const Twilio = require('../models/Twilio');

router.post('/register', function (req, res) {
    const id = req.body.id;
    const phoneNumber = req.body.phoneNumber;
    Twilio.findById({ id })
        .then(twilio => {
            if (twilio && twilio.phoneNumber === phoneNumber) {
                return res.status(400).json({
                    phoneNumber: 'Already registered.'
                });
            } else {
                const twilioUser = new Twilio({
                    id: id,
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

router.post('/unregister', function (req, res) {
    const id = req.body.id;
    const phoneNumber = req.body.phoneNumber;
    Twilio.findById({ id })
        .then(twilio => {
            if (twilio && twilio.phoneNumber === phoneNumber) {
                twilio
                    .remove()
                    .then(done => {
                        res.json(done);
                    });
            } else {
                return res.status(400).json({
                    phoneNumber: 'No Phone Number to remove.'
                });
            }
        });
});

module.exports = router;