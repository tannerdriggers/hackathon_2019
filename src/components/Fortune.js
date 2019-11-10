import React, { Component } from 'react';
const fortune = require("fortune-cookie");

class Fortune extends Component {
    getFortune() {
        const rand = Math.round(Math.random(fortune.length) * 250);
        return (<div>{fortune[rand]}</div>);
    }

    render() {
        return (
            <h1>
                {this.getFortune()}
            </h1>
        )
    }
}

export default Fortune;