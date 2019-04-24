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
      this.setState({ logoff:true })
    }






    render() {


        if (this.state.logoff === true){
          return <Redirect to='/login' />
        }
      // console.log(this.state.username)
      // console.log(this.state.logout)
    return (

    <Router>
      <div>
        <header>
            {this.state.token ?
                <div className="el-div">
                    <p className="email-text">{ this.state.username }</p>
                    <button className="logout" onClick={this.logout}>Logout</button>
                </div> :
                <div className="logintext">
                    <NavLink to='/login' className="loginnav">LOGIN</NavLink><br></br>
                    <NavLink to='/register' className="regnav">REGISTER</NavLink><br></br>
                    <NavLink to='/todo' className="todonav">TODO</NavLink>
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
