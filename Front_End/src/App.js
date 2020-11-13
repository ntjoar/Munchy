import React, { Fragment } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css'
import {loadUser} from './actions/authAction'
import {Provider} from 'react-redux'
import store from './store'


import Login from './Pages/Login'
import Register from './Pages/signUp'
import HomePage from './Pages/HomePage'
import AuthRoute from './Components/AuthRoute'
import IndexPage from './Pages/IndexPage'
import Dashboard from './Dashboard'



class App extends React.Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }

  
  render() {

   
     
    return (
      <Fragment>
      <Provider store={store}>
      <Router>
   <Switch>
   <Route path="/" exact ><HomePage/></Route>

   <Route  path="/login" exact > <Login/> </Route>
   <Route  path="/signup" exact  ><Register/> </Route>
   <Route  exact path="/home" render={(props) => <IndexPage {...props} />} /> 
   <Route path="/dashboard" exact><Dashboard /></Route>
   </Switch>
   </Router>
   </Provider>
     
      </Fragment>
    );
  }
}

export default App;