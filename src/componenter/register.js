import React, { Component } from 'react';
import axios from 'axios';
import {updateToken} from "../JWT";
import { Route, Link, Redirect } from "react-router-dom";
import Login from './login'

class Register extends Component {


  constructor(props) {
    super(props);
    this.state = {
      register:false,
      err:false,
      mail:"",
      password:"",

    };
  }

// onFail (e){
//   e.Default();
// }

  Submit(e){
  e.preventDefault();

  let root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
  console.log(this.state)
  axios.post(root + "/register", {
    password: this.state.password,
    email: this.state.mail,
  })
  .then((response)=>{

    console.log(response.data);
    updateToken(response.data.token);

    this.setState({
      register: true
    })
  })
  .catch((err)=>{
      //console.log('working')
      console.log(err);
      this.setState({
        err: true
      })
    })
  }

  getInputValues = e => {
  this.setState({
    [e.target.name]: e.target.value
  }, () => console.log(this.state))
}


  render() {
    if (this.state.register === true) {
      return <Redirect to="/login" />
    } else if (this.state.err) {
          return (
            <div>
              <p>Error, problem has been detected</p>
            </div>
              )
          }

    return (
      <div className='login-screen'>
      <h1 className="text-register">REGISTER</h1>
          <input
              className="input-l"
              type='email'
              name="mail"
              placeholder="Email"
              onChange={this.getInputValues}
          /> <br></br>
          <input
            className="password-l"
            type='password'
            name="password"
            placeholder='Password'
            onChange={this.getInputValues}
          />
            <br></br>
            <button
              className="btn-L"
              type='submit'
              value="Submit"
              onClick={(e) => this.Submit(e)}
              >Register
            </button>

        </div>


    );
  }
}

export default Register;
