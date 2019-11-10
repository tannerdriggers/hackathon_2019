import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Fortune from './Fortune';

import Twilio from './Twilio';

class Home extends Component {

    render() {
        const { isAuthenticated } = this.props.auth;

        const auth = (
            <div>
                <div className="card border-0 m-3">
                    <div className="card-body">
                        <div className="card-title">
                            <h3 className="text-dark">Your fortune:</h3>
                        </div>
                        <div className="card-text">
                            <Fortune />
                        </div>
                    </div>
                </div>
                <Twilio />
            </div>
        );

        const guest = (
            <div>Login to see your personalized fortune.</div>
        );

        return (
            <div>
                {isAuthenticated ? auth : guest}
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Home));