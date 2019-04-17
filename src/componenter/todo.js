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
            value: ""
        };
      }

    getData(token){
      console.log(token);
      let root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";

      axios.get( root + "/todos", {
         headers: {
         Authorization: "Bearer" + token,
        }
      .then (res => {
        console.log(res.data.todos);
        })
      .catch (error =>{
        console.log(error)
      })
    })

    }

    componentDidMount(){
        this.getData();
    }





    render() {


      return (
        <div>
          <li></li>

        </div>
        )
      }
    }


export default Todo;
