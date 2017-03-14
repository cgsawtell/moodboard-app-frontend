import React, { Component } from 'react';
import { login } from '../../auth'

class LoginRoute extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:'',
      password:''
    }
    this.handleLogin = this.handleLogin.bind(this) 
    this.handleInputChange = this.handleInputChange.bind(this) 
  }
  async handleLogin(e){
    e.preventDefault();
    const loginSuccess = await login(this.state.username, this.state.password)
    if(loginSuccess){
      this.props.router.push('/board/list')
    }
    else{
      alert('login failed')
    }
  }
  handleInputChange(e){
    const updatedState = {}
    const valueToChange = e.target.name
    const value = e.target.value
    updatedState[valueToChange] = value
    this.setState(updatedState)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <label>Username</label>
          <input onChange={this.handleInputChange} type="text" name="username"/>
          <label>Password</label>
          <input onChange={this.handleInputChange} name="password" type="password"/>
          <input type="submit" name="password" value="login"/>
        </form>
      </div>
    );
  }
}

export default LoginRoute;