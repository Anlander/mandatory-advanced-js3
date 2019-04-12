import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { token$, removeToken } from '../JWT';
import jwt from 'jsonwebtoken';
import axios from 'axios';



class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            email: '',
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
