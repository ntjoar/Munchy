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

//const fetch = require("node-fetch");

function fetchRequest(recipeURL) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    url: recipeURL,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://localhost:8000/recipe/get/", requestOptions);
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.addRecipeURL = this.addRecipeURL.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
    this.removeItem = this.removeItem.bind(this);
    // this.getRequest = this.getRequest(this);
    this.items = [];
    this.state = {
      isOpenItem: false,
      isOpenRecipe: false,
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
      recipeURL: "",
      recipeURLPlaceholder: "",
      recipeItems: [],
    };
  }

  addItem(itemVal) {
    this.setState({
      item: itemVal,
    });
  }

  addRecipeURL(url) {
    this.setState({
      recipeURL: url,
    });
  }

  clickToAdd = () => {
    this.setState((state) => {
      var items = state.items;
      if (state.item != "") {
        var items = state.items.concat(state.item);
      }

      return {
        isOpenItem: false,
        items: items,
        item: "",
      };
    });
  };

  clickToAddRecipe = () => {
    //API call here and set the state
    console.log(this.state.recipeURL);
    const url = this.state.recipeURL;

    fetchRequest(url)
      .then((response) => response.json())
      .then((result) =>
        this.setState((state) => {
          const res = result.ingredients;
          if (res.length != 0) {
            var items = state.items.concat(res);
          }
          return {
            isOpenRecipe: false,
            items: items,
            item: "",
          };
        })
      )
      .catch((error) => console.log("error", error));
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
            <div className="topleft">
              <Button
                className="button-general"
                onClick={(e) => this.setState({ isOpenItem: true })}
              >
                + Items
              </Button>
              <PopupPrompt
                isOpen={this.state.isOpenItem}
                onClose={(e) => this.setState({ isOpenItem: false })}
                addItem={this.addItem}
                clickToAdd={this.clickToAdd}
              >
                Please Enter the Ingredient
              </PopupPrompt>
              <Button
                className="button-general"
                onClick={(e) => this.setState({ isOpenRecipe: true })}
              >
                + Recipe
              </Button>
              <PopupPrompt
                isOpen={this.state.isOpenRecipe}
                onClose={(e) => this.setState({ isOpenRecipe: false })}
                addItem={this.addRecipeURL}
                clickToAdd={this.clickToAddRecipe}
              >
                Please Enter the Recipe URL
              </PopupPrompt>
            </div>
            <Button className="storeprefbutton ">
              Store Preference Selection
            </Button>
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
