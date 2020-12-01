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

        <div className="bruh">
            <div className="radius-input">
              <div>Radius (miles)</div>
              <input 
                className="radius-textarea" 
                maxLength="10" 
                id="radius"
              ></input>
            </div>
            <Form>
              <FormGroup check>
                <Input type="radio" name="radio1" id="radio1" disabled/>{' '}
                <Label for="radio1">ayo</Label>
              </FormGroup>
            </Form>
        </div>    

        <div className="modal-div-right">
          <Button
            className="modal-common-button"
            onClick={() => this.props.setRadius(document.getElementById("radius").value)}
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
