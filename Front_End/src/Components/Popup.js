import React, { Component } from "react";
import "../CSS/Popup.css";
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

class PopupPrompt extends Component {
  render() {
    let prompt = (
      <div className="modal-container modal-center round-border">
        <div className="modal-div-right">
          {" "}
          <Button className="modal-button" onClick={this.props.onClose}>
            x
          </Button>
        </div>

        <div>
          <p>{this.props.children}</p>
          <input
            className="modal-textarea"
            maxLength="100"
            onChange={() =>
              this.props.addItem(document.getElementById("ingredients").value)
            }
            id="ingredients"
          ></input>
        </div>

        <div className="modal-div-right">
          <Button
            className="modal-common-button"
            onClick={this.props.clickToAdd}
          >
            Add
          </Button>
        </div>
      </div>
    );
    if (!this.props.isOpen) {
      prompt = null;
    }
    return (
      <div>
        <strong>{prompt}</strong>
      </div>
    );
  }
}

export default PopupPrompt;
