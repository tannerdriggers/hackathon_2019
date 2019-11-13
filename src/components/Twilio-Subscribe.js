import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { registerTwilio } from '../actions/twilio';
import { connect } from 'react-redux';
import isEmpty from '../is-empty';

class TwilioSubscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.auth.user.name,
            id: props.auth.user.id,
            phoneNumber: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const twilio = {
            name: this.state.name,
            id: this.state.id,
            phoneNumber: this.state.phoneNumber,
        }
        this.props.registerTwilio(twilio);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>Subscribe to Daily Texts</h2>
                <p className="text-danger">*Does not work because of Twilio's Trial mode restrictions</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Phone Number (ex: ##########)"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.phoneNumber
                            })}
                            name="phoneNumber"
                            onChange={this.handleInputChange}
                            value={this.state.phoneNumber}
                        />
                        {errors.phoneNumber && (<div className="invalid-feedback">{errors.phoneNumber}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

TwilioSubscribe.propTypes = {
    registerTwilio: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerTwilio })(TwilioSubscribe);