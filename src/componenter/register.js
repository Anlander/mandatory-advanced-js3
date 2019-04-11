import React, { Component } from 'react';
import axios from 'axios';
import {updateToken} from "../JWT";
import { Route, Link, Redirect } from "react-router-dom";


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
    mail: this.state.mail
  })
  .then((response)=>{

    console.log(response.data);
    updateToken(response.data.token);

    this.setState({
      register: true,
    })
  })
  .catch((err)=>{
      //console.log('working')
      console.log(err);
      this.setState({
        err: true,
      })
    })
  }

  getInputValues = e => {
  this.setState({
    [e.target.name]: e.target.value
  }, () => console.log(this.state))
}


  render() {
    if (this.state.login) {
      return <Redirect to="/login" />;
    } else if (this.state.err) {
          return (
            <div>
              <p>Error, problem has been detected, try again</p>
            </div>
              )
          }

    return (
      <div className='login-div'>
      <h1>Enter Email and Password</h1>
          <input
              className="login-input"
              type='email'
              name="mail"
              ref="username"
              placeholder="Email"
              onChange={this.getMailValues}
          /> <br></br>
          <input
            type='password'
            ref='password'
            name="password"
            placeholder='Password'
            onChange={this.getPasswordValues}
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
