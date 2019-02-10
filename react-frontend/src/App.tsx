import React, { Component } from 'react';
import './css/App.css';
import Auction from "./components/Auction";
import AuctionForm from "./components/AuctionForm";
import SignUp from "./components/SignUp";
import Results from "./components/Results";
import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="appTitle">
          <img src={logo}/>
          Silent Auction
        </h1>
        <SignUp/>
        <Auction/>
        <Auction/>
        <Auction/>
        <Results/>
        <AuctionForm/>
        <AuctionForm/>
        <div className="footer">
          Made with &lt;3 by <a href="nhsurl">NHS</a> and <a href="wturl">Web Team</a>.
        </div>
      </div>
    );
  }
}

export default App;
