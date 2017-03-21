import React, { Component } from 'react';
import {Link} from 'react-router'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/login">Login</Link><br/>
        <Link to="/create-account">Create Account</Link>
      </div>
    );
  }
}

export default App;
