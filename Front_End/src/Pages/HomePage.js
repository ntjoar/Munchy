//This is a public page route

import React, { Component, Fragment } from "react";
import HeaderApp from "../Components/Header";
class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderApp />
        <h1>This is the welcome page</h1>
        <p>A presentation slider can go here</p>
      </Fragment>
    );
  }
}

export default HomePage;
