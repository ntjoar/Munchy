import React, {Component, Fragment} from 'react';
import HeaderApp from '../Components/Header'
import {getRecipes, deleteRecipe} from '../actions/recipeActions'
import {clearErrors} from '../actions/errorActions'
import { faUserCircle, faLock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, useHistory } from "react-router-dom"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import ReadMoreReact from 'read-more-react';
import { AvForm, 
    AvField, 
    AvGroup, 
    AvInput, 
    AvFeedback, 
    AvRadioGroup, 
    AvRadio, 
    AvCheckboxGroup, 
    AvCheckbox } from 'availity-reactstrap-validation';
import {
Button,
Form,
FormGroup,
Label,
Input,
Row,
Col,
Alert,
Container,
Card,
CardTitle,
InputGroup,
CardText,
CardBody, 
ListGroup,
ListGroupItem,
CardImg,  CardGroup,
CardSubtitle,
Modal, ModalHeader, ModalBody, ModalFooter





} from 'reactstrap'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'


class Recipes extends Component {
    constructor(){
        super();
        this.state = { modal: false,
                        name: '',
                    instructions:'',
                    ingredients:[],
                image:''};
      }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        getRecipes : PropTypes.func.isRequired,
        deleteRecipe : PropTypes.func.isRequired,
        recipe : PropTypes.object.isRequired
    }
    
    componentDidMount(){
        const id = localStorage.getItem('id')
        this.props.getRecipes(id);
    }
    
    onDeleteClick = id => {
        this.props.deleteRecipe(id);
    }
    
 

    
    render(){
        const { recipes } = this.props.recipe;
        const {isAuthenticated, user }  = this.props.auth;

        return (
            
            <Fragment>
            <HeaderApp />
            {!isAuthenticated ? <Redirect to="/login" /> : null}
            <div className="mb-4 mt-4 pl-15 recipe_header" ><h4>Your save recipes</h4></div>
            <Container fluid>
            
            
           
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 5 }}>
                {recipes.map(({_id, name, image, instructions, ingredients, totalTime})=>(
                    <ListGroup>
                    <ListGroupItem>
                  
                    <Card>
                      <CardImg top className="recipe_img" src={image} alt="Card image cap" />
                      <CardBody>
                        <CardTitle tag="h5">{name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-1 text-muted">Preparation time: {totalTime ? totalTime : 'No time estimation provided'}</CardSubtitle>
                        <CardText><Button outline className="recipe_button" color="danger" onClick={() => this.setState({ modal: !this.state.modal, name: name, instructions: instructions, ingredients:ingredients, image:image })} >Read more</Button> </CardText>
                        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                        toggle={() => this.setState({ modal: !this.state.modal })} >
                        <ModalHeader toggle={() => this.setState({ modal: !this.state.modal })}>{this.state.name}</ModalHeader>
                         <ModalBody>
                         <img src={this.state.image} className="recipe_img2"></img>
                         <hr></hr>
                         <h5>Ingredients:</h5>
                         {this.state.ingredients.map((number) => 
                            <li>{number}</li>)}
                         <hr></hr>
                         <h5>Instructionts:</h5>
                        {this.state.instructions}
                          </ModalBody>
                            <ModalFooter>
                        <Button color="secondary" onClick={() => this.setState({ modal: !this.state.modal })}>Close</Button>
                         </ModalFooter>
                          </Modal>
                        <Button onClick= {this.onDeleteClick.bind(this,_id)}>Delete this recipe</Button>
                      </CardBody>
                    </Card> 
                 
                    </ListGroupItem>
                    </ListGroup>
                    
                   
                   

                ))}
                </div>
              
       
                </Container>
            </Fragment>
            
        )
           
    }



}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth,
    recipe: state.recipe


})
export default connect (
    mapStateToProps,
    {getRecipes, deleteRecipe}
)(Recipes);

