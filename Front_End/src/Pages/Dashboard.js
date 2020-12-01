import React, { Component, Fragment, useState } from "react";
import "../CSS/Dashboard.css";
import "../CSS/Item.css";
import HeaderApp from "../Components/Header";
import Item from "../Components/Item";
import PopupPrompt from "../Components/Popup";
import StorePrefPopupPrompt from "../Components/StorePrefPopup";
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
      storePrefIsOpen: false,
      userLat: "",
      userLong: "",
      userRadius: 2000, // CHANGE USER RADIUS
      items: [], // added some items for developing purposes
      item: "",
      searchResult: {},
    };
  }

  componentDidMount() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({userLat: position.coords.latitude, userLong: position.coords.longitude});
      });
    }
    else {
      console.log("Location unavailable");
    }
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

  searchItems = () => {
    let num_items = this.state.items.length;
    let api_url = "http://localhost:8000/radius=" + this.state.userRadius + "&la=" + this.state.userLat + "&lo=" + this.state.userLong + "/";
    var i;
    for(i = 0; i < num_items; i++) {
      api_url += this.state.items[i];
      if(i < num_items - 1) {
        api_url += "&";
      }
    }
    fetch(api_url)
    .then(response => response.json())
    .then(data => this.setState({searchResult: data}));
  };

  render() {
    return (
      <Fragment>
        <HeaderApp />
        <PopupPrompt></PopupPrompt>
        <div className="container">
          <div className="topbuttonrow">
            <div className='topleft'>
              <Button
                className="button-general"
                onClick={(e) => this.setState({ isOpen: true, storePrefIsOpen: false })}
              >
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
              <Button className="button-general">+ Recipe</Button>
            </div>
            <Button className="storeprefbutton " onClick={(e) => this.setState({ isOpen: false, storePrefIsOpen: true })}>
              Store Preference Selection
            </Button>
            <StorePrefPopupPrompt
              isOpen={this.state.storePrefIsOpen}
              onClose={(e) => this.setState({ storePrefIsOpen: false })}
            />
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
            <Button className="searchbutton" onClick={this.searchItems}>Search</Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
