import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router} from "react-router-dom";
import {token$, updateToken, removeToken} from "./JWT";
import jwt from "jsonwebtoken";
import Login from './componenter/login';
import Register from './componenter/register';
import Todo from './componenter/todo';
import { NavLink, Link } from 'react-router-dom'
// import Todo from './todo';



  class App extends Component {
    constructor(props){
      super(props);
        this.state={
        username: "",
        logoff: false,
        token:token$.value
    }
  }

  componentDidMount() {
        this.subscription = token$.subscribe( (token) => {
        this.setState({ token });
        const decode = jwt.decode(token);
        if (decode) {
          this.setState({ username: 'Welcome ' + decode.email });
        }
      });
    }

  componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    logout = () => {
      removeToken();
    }
  





    render() {


        if (this.state.logoff === true){
          return <Login />
        }
      // console.log(this.state.username)
      // console.log(this.state.logout)
    return (

    <Router>
      <div>
        <header>
            {this.state.token ?
                <div>
                    <p>{ this.state.username }</p>
                    <button onClick={this.logout}>Logout</button>
                </div> :
                <div>
                    <NavLink to='/login'>LOGIN</NavLink> <br></br>
                    <NavLink to='/register'>REGISTER</NavLink> <br></br>
                    <NavLink to='/todo'>Todo</NavLink>
                </div>
            }
        </header>
           <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/todo" component={Todo}></Route>
          </Switch>
      </div>
    </Router>

    );
  }
}

  export default App;
