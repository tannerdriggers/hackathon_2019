import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TwilioSubscribe from './Twilio-Subscribe';
import TwilioUnsubscribe from './Twilio-Unsubscribe';

class Twilio extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="card border-0 m-3 mt-5">
                <div className="card-body">
                    <div className="card-title">
                        <h1 className="text-center text-dark">Daily Text Messages</h1>
                    </div>
                    <div className="card-text">
                        <div className="container">
                            <div className="col">
                                <TwilioSubscribe />
                            </div>
                            <div className="col">
                                <hr className="mt-5" style={{ color: "black", backgroundColor: "black" }} />
                            </div>
                            <div className="col">
                                <TwilioUnsubscribe />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Twilio);