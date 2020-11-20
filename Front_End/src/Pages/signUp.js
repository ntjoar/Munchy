//This is a public page route

import React, {Component, Fragment} from 'react';
import HeaderApp from '../Components/Header'
import {register} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
import { faUserCircle, faLock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect, useHistory } from "react-router-dom"

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
    CardBody


} from 'reactstrap'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class SignUp extends Component {
    state= {
        firstName:'',
        lastName:'',
        email: '',
        password: '',
        msg:null
        
    }
    static propTypes = {
        isAuthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        
    }
    
    componentDidUpdate(prevProps){
        const {error} = this.props;
        
        if(error !== prevProps.error){
            if(error.id=== 'REGISTER_FAIL'){
                this.setState({msg: error.msg})

            }
            else {
                this.setState({ msg: null})
            }
        }
    }
    
    onSubmit = e =>{
        this.props.clearErrors();
        e.preventDefault();
        const {firstName, lastName, email, password} = this.state;
        //Create User Object
        const newUser =
        {
            firstName,
            lastName,
            email,
            password,
           
        }
        //Attempt to register
        this.props.register(newUser);
        console.log(`The message is : ${this.state.msg}`);

    }

    changeValue = (e) => {
        this.props.clearErrors();
        this.setState({
         [e.target.name] : e.target.value   })
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;

        return (
            <Fragment>
            <HeaderApp />
        {isAuthenticated ? <Redirect to={{ pathname:"/home", state: { isAuthenticated: isAuthenticated, user: user }}}/> : null}

            <div className="Container">
            <Row>
            <Col>            
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
            <div className='signin-form'>
            <AvForm onSubmit={this.onSubmit}>
            <Container fluid className="full-height bg-light">
            <Row className="h-100 justify-content-center full-height align-items-center Login-wrap">
            <Col xs="10" lg="3" className="p-0">
              <Card>
                <CardBody>
                  <CardTitle><FontAwesomeIcon icon={faUserCircle}  size="2x" />  SIGN UP</CardTitle>
                  <hr></hr>
                  <CardText>Create an account.</CardText>

                  <InputGroup className="mb-3">
                  <Input type="text" name="firstName" id="firstName"   placeholder="Enter Your Firstname" onChange={this.changeValue} required/>                  </InputGroup>

                  <InputGroup className="mb-3">
                  <Input  type="text" name="lastName" id="lastName"  placeholder="Enter Your Lastname" onChange={this.changeValue} required/>                  </InputGroup>

                  <InputGroup className="mb-3">
                  <Input  type="text" name='email' id='email'  placeholder="Email" onChange={this.changeValue} required/>
                  </InputGroup>

                  <InputGroup className="mb-4">
                  <Input type="password" name='password' id='password'  placeholder="Password" onChange={this.changeValue} required/>
                  </InputGroup>

                  <Row>
                    <Col xs="12" lg="6">
                      <Button color="secondary" id ="click-login" className="px-4">Sign up</Button>
                    </Col>
                 
                  </Row>
                </CardBody>
              </Card>
            </Col>
            
          
          </Row>
              </Container>
            </AvForm>
            </div>
            </Col>
            
            </Row>
            
            </div>
            </Fragment>
        )
           
    }



}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth,

})
export default connect (
    mapStateToProps,
    {register, clearErrors}
)(SignUp);

