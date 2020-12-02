import React, { Component, Fragment, useState, useEffect } from "react";
import "../CSS/Dashboard.css";
import "../CSS/Item.css";
import HeaderApp from "../Components/Header";
import Item from "../Components/Item";
import PopupPrompt from "../Components/Popup";
import { connect } from "react-redux";
import StorePrefPopupPrompt from "../Components/StorePrefPopup";
import PropTypes from "prop-types";
import { login } from "../actions/authAction";
import { clearErrors } from "../actions/errorActions";
import { register } from "../actions/authAction";
import { Redirect } from "react-router-dom";
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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonGroup,
} from "reactstrap";
import { faLongArrowAltDown } from "@fortawesome/free-solid-svg-icons";

function fetchRequest(recipeURL, userid) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    url: recipeURL,
    userId: userid,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://localhost:8000/recipe/get/", requestOptions);
}

function loadRecipes(id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    userId: id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://localhost:8000/recipe/recipes/", requestOptions);
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.addRecipeURL = this.addRecipeURL.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    //this.reloadRecipes = this.reloadRecipes.bind(this);
    this.recipePromptMessage = "Please Enter the Recipe URL";
    this.userId = localStorage.getItem("id");

    this.state = {
      isOpenItem: false,
      isOpenRecipe: false,
      dropDownToggle: false,
      storePrefIsOpen: false,
      userLat: "",
      userLong: "",
      userRadius: 20,
      storeList: ["Ralphs", "Costco", "Food4Less", "Walmart"],
      numItemsPer: null,
      items: [],
      item: "",
      recipeURL: "",
      searchResult: {},
      recipePromptMessage: this.recipePromptMessage,
      currentRecipe: "Select Recipe",
      recipeNameList: [],
    };

    this.recipes = {};
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  reloadRecipes() {
    loadRecipes(this.userId)
      .then((response) => response.json())
      .then((result) => {
        this.recipes = result;
        var recipeList = [];
        for (var i = 0; i < result.length; i++) {
          recipeList.push(result[i].name);
        }

        this.setState({
          recipeNameList: recipeList,
        });
      })
      .catch((error) => console.log("Does not have any recipes yet"));
  }

  componentDidMount() {
    this.reloadRecipes();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          userLat: position.coords.latitude,
          userLong: position.coords.longitude,
        });
      });
    } else {
      console.log("Location unavailable");
    }
  }

  selectRecipe(event) {
    const selectedRecipeName = event.currentTarget.textContent;
    var items = [];
    for (var i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].name == selectedRecipeName) {
        items = this.recipes[i].Items;
      }
    }
    this.setState({
      currentRecipe: selectedRecipeName,
      items: items,
    });
  }

  toggle() {
    const negate = !this.state.dropDownToggle;
    this.setState({
      dropDownToggle: negate,
      isOpenItem: false,
      isOpenRecipe: false,
      storePrefIsOpen: false,
    });
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

  //TODO: get nice error message
  clickToAddRecipe = () => {
    const url = this.state.recipeURL;

    if (url.includes("http://") || url.includes("https://")) {
      // TODO: check if the text contains https or http://
      // if it does, call API,
      // Otherwise, create a new recipe with empty list
      fetchRequest(url, this.userId)
        .then((response) => response.json())
        .then((result) => {
          document.getElementById("add-button").removeAttribute("disabled");
          try {
            console.log(result);
            const res = result.Items;

            this.setState((state) => {
              var items = state.items.concat(res);

              this.reloadRecipes();

              return {
                isOpenRecipe: false,
                items: items,
                recipePromptMessage: this.recipePromptMessage,
                currentRecipe: result.name,
              };
            });
          } catch (error) {
            console.log(error);
            return {
              recipePromptMessage:
                "Failed To Parse. Either Invalid URL or Recipe already in the cookbook",
            };
          }
        })
        .catch((error) => {
          document.getElementById("add-button").removeAttribute("disabled");
          console.log(error);
          this.setState((state) => {
            return {
              recipePromptMessage:
                "Failed To Parse. Either Invalid URL or Recipe already in the cookbook",
            };
          });
        });

      document
        .getElementById("add-button")
        .setAttribute("disabled", "disabled");
    } else {
      //TODO: Add Recipe here
    }
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

  setRadius = (radiusVal) => {
    this.setState({ userRadius: radiusVal });
  };

  setNumItems = (numItemsVal) => {
    this.setState({ numItemsPer: numItemsVal });
  };

  setStorePref = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    this.setState({ storeList: value });
  };

  searchItems = () => {
    let num_items = this.state.items.length;
    let num_stores = this.state.storeList.length;
    let api_url =
      "http://localhost:8000/radius=" +
      this.state.userRadius +
      "&la=" +
      this.state.userLat +
      "&lo=" +
      this.state.userLong +
      "/";

    var i;

    for (i = 0; i < num_items; i++) {
      api_url += this.state.items[i];
      if (i < num_items - 1) {
        api_url += "&";
      }
    }
    api_url += "/";
    for (i = 0; i < num_stores; i++) {
      api_url += this.state.storeList[i];
      if (i < num_stores - 1) {
        api_url += "&";
      }
    }
    if (this.state.numItemsPer == null) {
      api_url += "/none";
    } else {
      api_url += "/" + this.state.numItemsPer;
    }

    console.log(api_url);

    fetch(api_url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          searchResult: data,
        });
      });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Fragment>
        <HeaderApp />
        {!isAuthenticated ? <Redirect to="/login" /> : null}
        <div className="container">
          <ButtonGroup size="md" className="topleft">
            <Button
              className="button-general"
              onClick={(e) =>
                this.setState({
                  isOpenItem: true,
                  storePrefIsOpen: false,
                  isOpenRecipe: false,
                })
              }
            >
              + Items
            </Button>

            <Button
              className="button-general"
              onClick={(e) =>
                this.setState({
                  isOpenRecipe: true,
                  storePrefIsOpen: false,
                  isOpenItem: false,
                  recipePromptMessage: this.recipePromptMessage,
                })
              }
            >
              + Recipe
            </Button>

            {/* RECIPE DROP DOWN LIST SECTION */}

            <Dropdown isOpen={this.state.dropDownToggle} toggle={this.toggle}>
              <DropdownToggle caret className="button-dropdown">
                {this.state.currentRecipe}
              </DropdownToggle>
              <DropdownMenu className="drop-down-menu">
                {this.state.recipeNameList.map((value) => {
                  return (
                    <DropdownItem
                      className="drop-down-item"
                      onClick={this.selectRecipe}
                    >
                      {value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            {/* END OF RECIPE DROP DOWN LIST */}

            <Button
              className="storeprefbutton "
              onClick={(e) =>
                this.setState({
                  isOpenItem: false,
                  storePrefIsOpen: true,
                  isOpenRecipe: false,
                })
              }
            >
              Store Preference Selection
            </Button>
          </ButtonGroup>

          {/* Pop up Window Section */}
          <PopupPrompt
            className="left"
            isOpen={this.state.isOpenItem}
            onClose={(e) => this.setState({ isOpenItem: false })}
            addItem={this.addItem}
            clickToAdd={this.clickToAdd}
          >
            Please Enter the Ingredient
          </PopupPrompt>

          <PopupPrompt
            isOpen={this.state.isOpenRecipe}
            onClose={(e) =>
              this.setState({
                isOpenRecipe: false,
                recipePromptMessage: this.recipePromptMessage,
              })
            }
            addItem={this.addRecipeURL}
            clickToAdd={this.clickToAddRecipe}
          >
            {this.state.recipePromptMessage}
          </PopupPrompt>

          <StorePrefPopupPrompt
            isOpen={this.state.storePrefIsOpen}
            setRadius={this.setRadius}
            curRadius={this.state.userRadius}
            setStorePref={this.setStorePref}
            setNumItems={this.setNumItems}
            onClose={(e) => this.setState({ storePrefIsOpen: false })}
          />
          {/* End of Pop up Window Section */}

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
            <Button className="searchbutton" onClick={this.searchItems}>
              Search
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAthenticated,
  error: state.error,
  auth: state.auth,
});
export default connect(mapStateToProps, { login, register, clearErrors })(
  Dashboard
);
