import React, { Component } from 'react';
import '../css/ACP.css';

class AuctionForm extends Component {
  render() {
    return (
      <form className="ACPAuctionForm">
        <input type="text" placeholder="Bundle Name"/>
        <input type="text" placeholder="Image Url"/>
        <input type="number" placeholder="Starting Price"/>
        <textarea placeholder="Bundle Description"/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default AuctionForm;
