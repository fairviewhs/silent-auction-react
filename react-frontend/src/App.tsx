import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Auction from "./components/Auction";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Silent Auction</h1>
        <Auction/>
        <Auction/>
        <Auction/>
      </div>
    );
  }
}

export default App;
