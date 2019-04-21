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
    this.setState({ todos:res.data.todos })
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



    onsubmit(e){
        const root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
        let val ={content: this.state.value}

        axios.post(root + "/todos", val, {
          headers: {
            Authorization: "Bearer " + this.state.token,
          }
        })
        .then((res)=>{
            this.setState({
              todos: [...this.state.todos, res.data.todo]
            })
            console.log(this.state.todos);
        })
        .catch((err)=>{
            console.log(err)
            this.setState({
              err:true
            })
        })
    }

    removeTodo(id) {
      const root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
       axios.delete(root + '/todos' + id,
           { headers: { Authorization: 'Bearer ' + this.state.token } })
           .then(() => {
      axios.get(root + '/todos',
      { headers: { Authorization: 'Bearer ' + this.state.token } })
      .then((res) => {
         this.setState({ todos: res.data.todos });
            })
        });
   }









    render() {

        let todosContent = this.state.todos.map((todo) => {
        return <li>{todo.content}
        <button className="removeTask"
        onClick={(e) => this.removeTodo (e), (todo.id)}>x</button></li>
      })


      return (
        <div className='todo'>
        <h1> Todo List </h1>
          <input onChange={e => this.onChange(e)} placeholder="what to do?"/>
          <button onClick={e=> this.onsubmit(e)}>ADD</button>
          <label type="text" value={this.state.todos} />
          <li>{todosContent}</li>

         </div>
        )
      }
    }


export default Todo;
