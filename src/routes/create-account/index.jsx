import React, { Component } from 'react';
import { post } from 'axios'

const inputToState = (input) => {
  const updatedState = {}
  const valueToChange = input.name
  const value = input.value
  updatedState[valueToChange] = value
  return updatedState
}

class ReactAccountRoute extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
    this.state = {
      "firstName":'',
      "lastName":'',
      "email":'',
      "username":'',
      "password":''
    }
  }
  handleInputChange(e){
    const updatedState = inputToState(e.target)
    this.setState(updatedState)
  }
  async handleSubmit(e){
    e.preventDefault();
    const newAccount = await post('api/user', this.state)
    if(newAccount.status===201){
      alert('account created')
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input onChange={this.handleInputChange} type="text" name="firstName"/>
          <label>Last Name</label>
          <input onChange={this.handleInputChange} type="text" name="lastName"/>
          <label>Email Address</label>
          <input onChange={this.handleInputChange} type="email" name="email"/>
          <label>Username</label>
          <input onChange={this.handleInputChange} type="text" name="username"/>
          <label>Password</label>
          <input onChange={this.handleInputChange} type="password" name="password"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default ReactAccountRoute;