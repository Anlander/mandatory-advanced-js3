import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { token$, removeToken } from '../JWT';
import jwt from 'jsonwebtoken';
import axios from 'axios';



class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
            todos:[],
            value: ''
        };

      }




      getData(){

          let root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
          axios.get(root + '/todos', {
          headers: { Authorization: 'Bearer ' + this.state.token }
        })
          .then ( res =>{
            this.setState({ value:res.data.todos })
            console.log(res.data.todos);
          })
          .catch (err => {
            console.log("Request canceled", err.message);
          })



   }

    componentDidMount(){
       this.getData();

     }

    componentWillUnmount(){
       this.getData();
     }

    onChange(e){
       this.setState({ value: e.target.value })
       console.log(this.state)
     }







    render() {


      return (
        <div className='todo'>
        <h1> Todo List </h1>
          <input onChange={e => this.onChange(e)}  placeholder="what to do?"/>
          <button> Submit </button>
           </div>
        )
      }
    }


export default Todo;
