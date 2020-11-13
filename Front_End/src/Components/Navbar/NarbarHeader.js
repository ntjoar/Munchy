import React, { Component } from "react";
import "../../css/NavbarHeader.css";
import { Navbar, NavBarBrand, Container } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

class NavbarHeader extends Component {
  render() {
    return (
      <div className="header">
        <nav className="navbar">
          <a className="nav-bar-brand" href="#">
            Munchy
          </a>
          <ul className="nav">
            <li className="nav-list">
              <a id="len1" className="hoverable" href="#">
                Home
              </a>
            </li>
            <li className="nav-list">
              <a id="len2" className="hoverable" href="#">
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavbarHeader;
