import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authAction";
import { register } from "../actions/authAction";
import { clearErrors } from "../actions/errorActions";
import { Redirect, useHistory } from "react-router-dom"
import Logout from "../Components/Logout";


class LogoutTest extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        navCollapsed: true,
        showNavbar: false,
        modal: false,
        className: "navbar-header center",
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
      this.updateClass();
    }
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired,
    };
  
    render() {
      const { isAuthenticated, user } = this.props.auth;
      const { navCollapsed } = this.state;
      return(
          <Fragment>
         
        <button className="nav-link">{ isAuthenticated ? <Logout />: <div className="[data-testid='logoutTest']" ></div>}</button>
       
        </Fragment>
      )
      
    }
  
    updateClass() {
      let className = this.state.className;
      let splitClassName = className.split(" ");
      if (splitClassName.length > 1) {
        className = "navbar-header";
      } else {
        className = "navbar-header center";
      }
      this.setState({ className });
    }
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAthenticated,
    error: state.error,
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { login, register, clearErrors })(
    LogoutTest
  );
  