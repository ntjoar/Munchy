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
      <div className="modal-container modal-center">
        <div className="modal-div-right">
          {" "}
          <Button className="modal-button" onClick={this.props.onClose}>
            x
          </Button>
        </div>

        <div>
          <p>{this.props.children}</p>
          <textarea
            className="modal-textarea"
            onChange={() =>
              this.props.addItem(document.getElementById("ingredients").value)
            }
            id="ingredients"
          ></textarea>
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
    return <div>{prompt}</div>;
  }
}

export default PopupPrompt;
