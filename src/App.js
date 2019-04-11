import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Redirect } from "react-router-dom";
import {token$, updateToken, removeToken} from "./JWT";
import jwt from "jsonwebtoken";
import Login from './componenter/login';
import Register from './componenter/register';
import Todo from './componenter/todo';
// import Todo from './todo';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      logout: false,
      // token:token$.value
    }
  }

  componentDidMount() {
      this.subscription = token$.subscribe( (token) => {
        this.setState({ token });
        const decoded = jwt.decode(token);
        if (decoded) {
          this.setState({ email: 'Welcome ' + decoded.email });
        }
      });
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

logout(event){
  removeToken();
  console.log("hej")
}


  render() {
    console.log(removeToken());
    console.log(this.state)

    return (
      <div>
        <Router>
        <Link to='/login'>LOGIN</Link> <br></br>
        <Link to='/register'>REGISTER</Link>
        <Link to='/todo'>REGISTER</Link>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/todo" component={Todo}></Route>
          <p>{ this.state.email }</p>
          <button onClick={this.logout} >Logout</button>

      </Router>

      </div>
    );
  }
  }

  export default App;
