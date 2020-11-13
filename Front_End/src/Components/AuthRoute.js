import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = ({ component: Component, isAthenticated , ...rest }) => {
    
    return (
      <Route
        {...rest}
        render={props =>
            isAthenticated  ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };

const mapStateToProps = ({ isAthenticated  }) => ({
    isAthenticated 
});

export default connect(mapStateToProps)(AuthRoute);