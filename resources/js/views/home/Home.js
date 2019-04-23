import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Redirect to='/helios-table' />
    }
}

