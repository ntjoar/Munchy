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
  Col
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
            <Form>
              <FormGroup >
                <Label for="radius">Radius (Miles)</Label>
                <Input type="radius" name="radius" id="radius" maxLength="10" onChange={() => this.props.setRadius(document.getElementById("radius").value)}/>
                <Label for="numItems">Number of Items Per Store</Label>
                <Input type="numItems" name="numItems" id="numItems" maxLength="10" onChange={() => this.props.setNumItems(document.getElementById("numItems").value)}/>
                <Label for="storeselect">Stores to Search</Label>
                <Input type="select" name="storeselect" id="storeselect" multiple onChange={this.props.setStorePref}>
                  <option>Ralphs</option>
                  <option>Costco</option>
                  <option>Walmart</option>
                  <option>Food4Less</option>
                </Input>
              </FormGroup>
            </Form>
        </div>    

        <div className="modal-div-right">
          <Button
            className="modal-common-button"
            onClick={() => {
              this.props.saveStorePref();
            }}
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
