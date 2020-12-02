import React, { Component, Fragment, useState } from "react";
import "../CSS/Dashboard.css";
import "../CSS/Item.css";
import HeaderApp from "../Components/Header";
import Item from "../Components/Item";
import PopupPrompt from "../Components/Popup";
import {connect} from 'react-redux'
import StorePrefPopupPrompt from "../Components/StorePrefPopup";
import PropTypes from 'prop-types'
import {login} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import {register} from '../actions/authAction'
import { Redirect} from "react-router-dom"
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

// function printJSON(jsonObject){

// }

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.addRecipeURL = this.addRecipeURL.bind(this);
    this.clickToAdd = this.clickToAdd.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.recipePromptMessage = "Please Enter the Recipe URL";
    // this.getRequest = this.getRequest(this);
    this.items = [];
    this.state = {
      isOpenItem: false,
      isOpenRecipe: false,
      storePrefIsOpen: false,
      userLat: "",
      userLong: "",
      userRadius: 20,
      storeList: ["Ralphs", "Costco", "Food4Less", "Walmart"],
      numItemsPer: null,
      items: [], // added some items for developing purposes
      item: "",
      recipeURL: "",
      recipeURLPlaceholder: "",
      recipeItems: [],
      searchResult: {},
      recipePromptMessage: this.recipePromptMessage,
    };
  }

  static propTypes = {
    isAuthenticated : PropTypes.bool,
    error : PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired

};

  componentDidMount() {
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
          try {
            const res = result.ingredients;
            if (res.length != 0) {
              var items = state.items.concat(res);
            }
            return {
              isOpenRecipe: false,
              items: items,
              item: "",
              recipePromptMessage: this.recipePromptMessage,
            };
          } catch (error) {
            return {
              recipePromptMessage:
                "Failed To Parse. Please Enter valid Recipe URL",
            };
          }
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
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => this.setState({ searchResult: data }));
  };

  render() {
    const {isAuthenticated, user} = this.props.auth;
    return (
      <Fragment>
        <HeaderApp />
        { !isAuthenticated ? <Redirect to="/login"/> : null}
        <PopupPrompt></PopupPrompt>
        <div className="container">
          <div className="topbuttonrow">
            <div className="topleft">
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
            </div>
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
            <StorePrefPopupPrompt
              isOpen={this.state.storePrefIsOpen}
              setRadius={this.setRadius}
              curRadius={this.state.userRadius}
              setStorePref={this.setStorePref}
              setNumItems={this.setNumItems}
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
              
          {/* below line checks if searchResult is empty; otherwise, we run our functions to display the results dashboard*/}
          { (Object.keys(this.state.searchResult).length == 0) ? null : 
            (
              <div className="dashboard">
                {
                  // loop through each store 
                  Object.keys(this.state.searchResult.data).map((key, i) => (
                    // the name of the paragraph block doesn't matter, <p test> works as well
                    <p key={i}> 
                      Store: {this.state.searchResult.data[key].name}

                      {
                        //for each store, loop through items 
                        Object.keys(this.state.searchResult.data[key].items).map((item, i) => (
                          <p item={i}> 
                            Item Name: {this.state.searchResult.data[key].items[item].query}

                            {
                              // for each item, loop through results
                              // trim results using slice to number of items per store (default = 1?? hard code this in? todo) 
                              // TODO: might say name even if array is empty; handle this? 
                              Object.keys(this.state.searchResult.data[key].items[item].itemData).slice(0, this.state.numItemsPer).map((product, i) => (
                                <p product={i}>
                                 Product Name: {this.state.searchResult.data[key].items[item].itemData[product].name}
                                 Price: {this.state.searchResult.data[key].items[item].itemData[product].price}
                                </p>

                                
                              ))

                              // Object.keys(this.state.searchResult.data[key].items[item].itemData).slice(0, this.state.numItemsPer).map((product, i) =>{
                              //   //create a item container with value equal to what we want 
                              //   return (
                              //   <div className="itemcontainer">
                              //   <div className="itemname">
                              //     {
                              //       "Store: " + this.state.searchResult.data[key].name
                              //     }
                              //   </div>
                              //   </div>
                              // );
                              // })
                                
                            }

                          </p>
                        ))
                      }
                    </p>
                    )
                  )
                }
              </div> 
            )
          }

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
const mapStateToProps = state =>({
  isAuthenticated : state.auth.isAthenticated,
  error: state.error,
  auth: state.auth

})
export default connect (
  mapStateToProps,
  {login, register, clearErrors}
)(Dashboard);

