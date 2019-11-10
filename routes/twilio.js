const express = require('express');
const router = express.Router();
require("dotenv").config();

const Twilio = require('../models/Twilio');

const twilioAcountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioAcountSid, twilioAuthToken);

router.post('/register', function (req, res) {
    const name = req.body.name;
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
                    name: name,
                    id: id,
                    phoneNumber: phoneNumber
                });

                twilioUser
                    .save()
                    .then(twilioUser => {
                        twilioClient.validationRequests
                            .create({
                                friendlyName: twilioUser.name,
                                phoneNumber: twilioUser.phoneNumber
                            })
                            .then(() => {
                                res.json(twilioUser);
                            });
                    });
            }
        });
});

router.post('/unregister', function (req, res) {
    const id = req.body.id;
    Twilio.findById({ id })
        .then(twilio => {
            if (twilio) {
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