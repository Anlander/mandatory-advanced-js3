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
            value: '',
            err: false
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
            console.log("errCancelled", err.message);
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



    onClick(e){
        const root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        let val ={
            value: this.state.value
        }

        axios.post(root + "/todos", val, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          }
        })
        .then((response)=>{
            this.setState({
              todos: [...this.state.todos, response.data.todo]
            })
            console.log(this.state.todos);
        })
        .catch((error)=>{
            console.log(error)
            this.setState({
              err:true
            })
        })
    }

    removeTodo(e) {
      const root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
       axios.delete(root + '/todos/' + e,
           { headers: { Authorization: 'Bearer ' + this.state.token } })
           .then(() => {
               axios.get(root + '/todos',
                   { headers: { Authorization: 'Bearer ' + this.state.token } })
                   .then((res) => {
                       this.setState({ value: res.data.todos });
                   })
           });
   }







    render() {


      return (
        <div className='todo'>
        <h1> Todo List </h1>
          <input onChange={e => this.onChange(e)} value={this.state.value} placeholder="what to do?"/>
          <button onClick={e=> this.onClick(e)}> ADD </button>
          <ul>
            <li>{this.value}</li>
          </ul>
           </div>
        )
      }
    }


export default Todo;
