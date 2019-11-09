import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const fortune = require("fortune-cookie");

class Home extends Component {

    getFortune() {
        const rand = Math.round(Math.random(fortune.length) * 250);
        return (<div>{fortune[rand]}</div>);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const auth = (
            <div>
                <h1>{user.name}</h1>
                <h3>Your fortune is:</h3>
                <h3>{this.getFortune()}</h3>
            </div>
        );

        const guest = (
            <div>Guest</div>
        );

        return (
            <div className="card border-0">
                <div className="card-body">
                    {isAuthenticated ? auth : guest}
                </div>
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