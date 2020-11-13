import React, {Component, Fragment} from 'react'
import { NavItem, NavLink} from 'reactstrap'
import {connect} from 'react-redux'
import {logout} from '../actions/authAction'
import PropTypes from 'prop-types'

export class Logout extends Component {
    static propTypes = {
        logout:PropTypes.func.isRequired
    }


    render(){
    return(
        <Fragment>
        <NavItem onClick={this.props.logout} href="#">Logout</NavItem>
        </Fragment>
    )
    }
}

export default connect(null, {logout}) (Logout)