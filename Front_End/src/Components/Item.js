import React, { Component } from "react";
import "../CSS/Item.css";

class Item extends Component {
  render() {
    return (
      <div className="itemcontainer">
        <div className="removebutton">X</div>
        <div className="itemname">{this.props.children}</div>
      </div>
    );
  }
}

export default Item;
