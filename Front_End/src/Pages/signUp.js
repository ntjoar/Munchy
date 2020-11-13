//This is a public page route

import React, {Component, Fragment} from 'react';
import HeaderApp from '../Components/Header'
import {register} from '../actions/authAction'
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
      
        return (
            <Fragment>
            <HeaderApp />
            <div className="Container">
            <Row>
            <Col>
            <div className="register_div"><h1>Create an account</h1></div>
            
            {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}

            <Form className="ml-4" onSubmit={this.onSubmit}>
            <Row className="ml-3 mr-3" form>
                <Col md={6}>
                <FormGroup>
                <Label for="firstName">Your first name</Label>
                <Input type="text" name="firstName" id="firstName" onChange={this.changeValue}/>
              </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                <Label for="lastName">Your last name</Label>
                <Input type="text" name="lastName" id="lastName" onChange={this.changeValue}/>
              </FormGroup>
                </Col>
              </Row>
              <Row className="ml-3 mr-3" form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Enter your email" onChange={this.changeValue}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={this.changeValue} />
                  </FormGroup>
                </Col>
              </Row>
              <Button className="ml-3 mr-3">Sign in</Button>
            </Form>

            </Col>
            
            </Row>
            
            </div>
            </Fragment>
        )
           
    }



}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error
})
export default connect (
    mapStateToProps,
    {register, clearErrors}
)(SignUp);

