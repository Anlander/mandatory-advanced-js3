import React, { Component } from 'react';
import axios from 'axios';
import {updateToken} from "../JWT";
import { Route, Link, Redirect } from "react-router-dom";
class Login extends Component {


  constructor(props) {
    super(props);
    this.state = {
      login:false,
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

  const root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
  //console.log('test')
  axios.post(root + "/auth", {
    password: this.state.password,
    email: this.state.mail
  })
  .then((response)=>{

    console.log(response);
    updateToken(response.data);

    this.setState({
      login: true,
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
      return <Redirect to="/todo" />;
    } else if (this.state.err) {
          return (
            <div>
              <p>Error, problem has been detected, reload the page please</p>
            </div>
              )
          }

    return (
      <div className='login-div'>
      <h1>Please enter your login</h1>
          <input
              className="login-input"
              type='email'
              name="mail"
              placeholder="Email"
              onChange={this.getInputValues}
          /> <br></br>
          <input
            type='password'
            name="mail"
            placeholder='Password'
            onChange={this.getInputValues}
          />
            <br></br>
            <button
              className="btn-L"
              type='submit'
              onClick={(e) => this.Submit(e)}
              >Login
            </button>

        </div>


    );
  }
}

export default Login;
