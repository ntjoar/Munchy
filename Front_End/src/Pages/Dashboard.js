import React, { Component, Fragment, useState } from "react";
import "../CSS/Dashboard.css";
import "../CSS/Item.css";
import HeaderApp from "../Components/Header";
import Item from "../Components/Item";
import PopupPrompt from "../Components/Popup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.items = [];
    this.state = {
      isOpen: false,
      items: [
        "Apple",
        "Steak",
        "Wagyu Steak",
        "Salmon",
        "Eggs",
        "Sugar",
        "Coke-Zero",
        "Chocolate",
        "Coffee",
        "Instant Noodle",
      ], // added some items for developing purposes
      item: "",
    };
  }

  addItem(itemVal) {
    this.setState({
      item: itemVal,
    });
  }

  clickToAdd = () => {
    this.setState((state) => {
      var items = state.items;
      if (state.item != "") {
        var items = state.items.concat(state.item);
      }

      return {
        isOpen: false,
        items: items,
        item: "",
      };
    });
  };

  removeItem = (index) => {
    this.setState((state) => {
      const items = state.items.filter((item, j) => index !== j);

      return {
        items,
      };
    });
  };

  clearItem = () => {
    this.setState({
      items: [],
    });
  };

  render() {
    return (
      <Fragment>
        <HeaderApp />
        <PopupPrompt></PopupPrompt>
        <div className="container">
          <div className="topbuttonrow">
            <Button onClick={(e) => this.setState({ isOpen: true })}>
              + Items
            </Button>
            <PopupPrompt
              isOpen={this.state.isOpen}
              onClose={(e) => this.setState({ isOpen: false })}
              addItem={this.addItem}
              clickToAdd={this.clickToAdd}
            >
              Please Enter the Ingredient
            </PopupPrompt>

            <div className="prefbutton">+ Recipe</div>
            <div className="storeprefbutton">Store Preference Selection</div>
          </div>

          <div className="dashboard">
            <div>
              {this.state.items.map((value, index) => {
                return (
                  <div className="itemcontainer">
                    <div
                      className="removebutton"
                      onClick={() => this.removeItem(index)}
                    >
                      X
                    </div>
                    <div className="itemname">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bottombuttonrow">
            <Button className="clearbutton" onClick={this.clearItem}>
              Clear
            </Button>
            <Button className="searchbutton">Search</Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
