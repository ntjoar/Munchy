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

class StorePrefPopupPrompt extends Component {
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
            
        </div>    

        <div className="modal-div-right">
          <Button
            className="modal-common-button"
            onClick={this.props.clickToAdd}
          >
            Save
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

export default StorePrefPopupPrompt;
