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
            todos: [],
            content: '',
            email: '',
            errorMessage: '',
        }

    }


    render() {

      return (
        <div>
      
        </div>
        );
      }
    }


export default Todo;
