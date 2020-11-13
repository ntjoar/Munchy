//this page wil be a redirection after login/registration of the user
// We will set up the features for the user to explore
//This is a private page route

import React, {Component, Fragment} from 'react';
import HeaderApp from '../Components/Header'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, useHistory } from "react-router-dom"
import {login} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {register} from '../actions/authAction'


class indexPage extends Component {

    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired

    };

    render(){
        const {isAuthenticated, user} = this.props.auth;

        return (
            
            <Fragment>
            <HeaderApp />
            { !isAuthenticated ? <Redirect to="/login"/> : null}
             {/*<h1>  { user ? `Welcome ${user.firstName}` : '' }</h1>*/}
            <p>user features can go here</p>
            </Fragment>
        )
    }
}
const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAthenticated,
    error: state.error,
    auth: state.auth

})
export default connect (
    mapStateToProps,
    {login, register, clearErrors}
)(indexPage);
