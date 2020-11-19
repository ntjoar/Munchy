import React, {Component, Fragment} from 'react';
import Dashboard from "../Components/Dashboard";
import HeaderApp from '../Components/Header'

export default class DashboardPage extends Component {
    render() {
        return (
            <Fragment>
                <HeaderApp/>
                <Dashboard />
            </Fragment>
        );
    }
}