import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unregisterTwilio } from '../actions/twilio';
import { connect } from 'react-redux';

class TwilioUnsubscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.auth.user.id,
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const twilio = {
            id: this.state.id,
            phoneNumber: this.state.phoneNumber,
        }
        this.props.unregisterTwilio(twilio);
    }

    render() {
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Unsubscribe from Daily Texts</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Unsubscribe
                    </button>
                    </div>
                </form>
            </div>
        );
    }
}

TwilioUnsubscribe.propTypes = {
    auth: PropTypes.object.isRequired,
    unregisterTwilio: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { unregisterTwilio })(TwilioUnsubscribe);