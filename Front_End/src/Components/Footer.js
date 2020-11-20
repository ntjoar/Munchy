import React, { Component } from "react";
import "../CSS/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <div className="footer-container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                Munchy is a team of CS130 Students here at UCLA. We understand
                the struggle of students trying to execute recipes but not
                knowing where to go for ingredients. We are hoping to create a
                solution in which students can set how far they are willing to
                travel for cheap ingredients near them. As such, we are hoping
                to give those students trying to take more interest in culinary
                arts, the choice to do so. Our hope with this website is to help
                promote more interest in the culinary arts using recipes. We
                want you to be able to cook and execute a recipe without the
                hassle of having to find where to find the cheapest available
                choice for each ingredient. This is a website made by students
                for students.
              </p>
              <p className="text-justify">
                This website is our final project for CS130 and not officially
                published
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Group Members</h6>
              <ul className="footer-links">
                <li>
                  <a href="https://github.com/ashwin-s-ranade">Ashwin Ranade</a>
                </li>
                <li>
                  <a href="https://github.com/ben-karim2014">Karim Ben</a>
                </li>
                <li>
                  <a href="https://github.com/articbear1999">Jacob Lin</a>
                </li>
                <li>
                  <a href="https://github.com/ntjoar">Nathan Tjoar</a>
                </li>
                <li>
                  <a href="https://github.com/guangchun324">Nelson Chong</a>
                </li>
                <li>
                  <a href="https://github.com/ryanklam">Ryan Lam</a>
                </li>
              </ul>
            </div>
          </div>
          <p className="copyright-text">
            Copyright &copy; 2020 All Rights Reserved by Munchy, CS130 Fall
            2020, UCLA
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
