//This is a public page route
import { Redirect, useHistory } from "react-router-dom"
import React, {Component, Fragment} from 'react';
import HeaderApp from '../Components/Header'
import { faUserAlt, faLock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {login} from '../actions/authAction'
import {clearErrors} from '../actions/errorActions'
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
    CardBody,
    CardTitle,
    CardText,
    InputGroup,
    CardLink,



} from 'reactstrap'


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Login extends Component{
    state= {
       
        email: '',
        password: '',
        msg:null
        
    }
    static propTypes = {
        isAthenticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        const {error} = this.props;
        
        if(error !== prevProps.error){
            if(error.id=== 'LOGIN_FAIL'){
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
        const {email, password} = this.state;

        //Create User Object
        const newUser =
        {
           
            email,
            password,
          
        }
        //Attempt to login
        
            this.props.login(newUser);
          //  window.location.reload(true);
       
        
       // console.log(`The message is : ${this.state.msg}`);

    }
    changeValue = (e) => {
        this.props.clearErrors();
        this.setState({
         [e.target.name] : e.target.value   })
    }
    render(){
        const {isAuthenticated, user} = this.props.auth;
        return (
            
            <Fragment>
            <HeaderApp />
            {isAuthenticated ? <Redirect to={{ pathname:"/home", state: { isAuthenticated: isAuthenticated, user: user }}}/> : null}
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
            <Form  onSubmit={this.onSubmit}>
            
            <Container fluid className="full-height bg-light">
            <Row className="h-100 justify-content-center full-height align-items-center Login-wrap">
              <Col xs="10" lg="3" className="p-0">
                <Card>
                  <CardBody>
                    <CardTitle>LOGIN</CardTitle>
                    <CardText>Sign in with your account.</CardText>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                        <FontAwesomeIcon icon={faUserAlt} />
                        </span>
                      </div>
                      <Input type="text" name='email' id='email' placeholder="Email" onChange={this.changeValue}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                        <FontAwesomeIcon icon={faLock} />
                        </span>
                      </div>
                      <Input type="password" name='password' id='password' placeholder="Password" onChange={this.changeValue}/>
                    </InputGroup>
                    <Row>
                      <Col xs="12" lg="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                   
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              
            
            </Row>
             
           <Row className="h-100 justify-content-center full-height align-items-center Login-wrap">
           <Col xs="10" lg="3" className="p-0">
           <Card color="dark">
             <CardBody className="text-white">
               <CardTitle>CREATE ACCOUNT</CardTitle>
               <CardText>Don't have an account. Please create an account </CardText>
            
               <Col xs="12" lg="6" className="text-right">
                   <Button color="link" className="px-0" href="/signup"> >>Join</Button>
                 </Col>
               
             </CardBody>
           </Card>
          
           </Col>
           </Row>
          </Container>
            </Form>
            </Fragment>
          );
    }

}
const mapStateToProps = state =>({
    isAthenticated : state.auth.isAthenticated,
    error: state.error,
    auth: state.auth

})
export default connect (
    mapStateToProps,
    {login, clearErrors}
)(Login);
