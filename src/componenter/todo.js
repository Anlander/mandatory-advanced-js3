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
        let val = {content: this.state.value}

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

    removeTodo(e) {
      const root = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
      let id = e.target.value
      console.log(id)
       axios.delete(root + '/todos/' + id,
           { headers: { Authorization: 'Bearer ' + this.state.token} })
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
        return <li className="li-todo">{todo.content}
        <button className="removetodo"
        onClick={(e) => this.removeTodo(e)} value={todo.id}>x</button></li>
      })


      return (
        <div className='todo-div'>
        <h1 className="text-login"> Todo List </h1>
          <input className="input-l" onChange={e => this.onChange(e)} placeholder="what to do?"/>
          <button className="btn-todo" onClick={e=> this.onsubmit(e)}>ADD</button><br></br>
          <label className="li-todo">{todosContent}</label>

         </div>
        )
      }
    }


export default Todo;
