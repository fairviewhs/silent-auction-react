import React, { Component } from 'react';
import './css/App.css';
import Auction from "./components/Auction";
import SignUp from "./components/SignUp";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="appTitle">Silent Auction</h1>
        <SignUp/>
        <Auction/>
        <Auction/>
        <Auction/>
        <div className="footer">
          Made with &lt;3 by <a href="nhsurl">NHS</a> and <a href="wturl">Web Team</a>.
        </div>
      </div>
    );
  }
}

export default App;
