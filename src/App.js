import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Redirect } from "react-router-dom";
import {token$, updateToken, clearToken} from "./JWT";
import jwt from "jsonwebtoken";
import Login from './componenter/login';
import Register from './componenter/register';
// import Todo from './todo';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      logout: false,
    }
  }

  componentDidMount() {
   this.subscription = token$.subscribe((token) => {
     this.setState({ token });
   });
 }

 componentWillUnmount() {
   this.subscription.unsubscribe();
 }


  render() {
    return (
      <div>
        <Router>
        <Link to='/login'>HOME</Link> <br></br>
        <Link to='/register'>REGISTER</Link>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Router>
      </div>
    );
  }
  }

  export default App;
