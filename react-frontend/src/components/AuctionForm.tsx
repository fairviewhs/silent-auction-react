import React, { Component } from 'react';
import '../css/ACP.css';

class AuctionForm extends Component {
  render() {
    return (
      <form className="ACPAuctionForm">
        <label>Name:</label>
        <input type="text" placeholder="Bundle Name"/>
        <label>Image Url:</label>
        <input type="text" placeholder="Image Url"/>
        <label>Start Price:</label>
        <input type="number" placeholder="Starting Price"/>
        <label>Description:</label>
        <textarea placeholder="Bundle Description"/>
        <label>Start Time:</label>
        <input type="datetime-local"/>
        <label>End Time:</label>
        <input type="datetime-local"/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default AuctionForm;
