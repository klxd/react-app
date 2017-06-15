import React, { Component } from 'react';
import logo from './logo.svg';
import Game2048 from './Game2048';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>2048</h2>
        </div>
        <Game2048 />
      </div>
    );
  }
}

export default App;
