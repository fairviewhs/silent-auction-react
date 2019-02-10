import React, { Component } from 'react';
import '../css/Auction.css';

class Auction extends Component {
  render() {
    return (
      <div className="auction">
        <h2 className="auctionName">Bundle Name</h2>
        <img src="http://style.anu.edu.au/_anu/4/images/placeholders/person.png" className="auctionImg"/>
        <p className="auctionDesc">
          Treat yourself to some well-deserved relaxation and happiness after all your hard work! Indulge in a gift basket of chocolates and bath salts from Premier Commercial Interiors, then get a refreshing acupuncture session from Inner Path Acupuncture. Try an hour of deeply calming flotation therapy at Isolate to recover from any stress in your life. 
        </p>
        <div className="auctionStart">
            Starting Price:
            <div className="auctionStartVal">
                XXX
            </div>
        </div>
        <div className="auctionHighest">
            Highest Bid:
            <div className="auctionHighestVal">
                XXX
            </div>
        </div>
        <form className="auctionForm">
            <input type="number" placeholder="Make a bid"/>
            <input type="submit" value="Bid"/>
        </form>
      </div>
    );
  }
}

export default Auction;
