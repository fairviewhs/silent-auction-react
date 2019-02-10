import React, { Component } from 'react';
import '../css/Auction.css';
import BidForm from './BidForm';

export interface AuctionProps {
  startingPrice: number;
  highestPrice: number;
  enteredPrice: number;
  canBid: boolean;
  onChange: (bidPrice: number) => any;
  onSubmit: () => any;
}

class Auction extends Component<AuctionProps> {

  formatMoney = (money: number) => {
    return `$${money.toFixed(2)}`;
  }

  render() {
    const { startingPrice, highestPrice, enteredPrice, canBid, onChange, onSubmit } = this.props;
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
                {this.formatMoney(startingPrice)}
            </div>
        </div>
        <div className="auctionHighest">
            Highest Bid:
            <div className="auctionHighestVal">
                {this.formatMoney(highestPrice)}
            </div>
        </div>
        {
          canBid &&
          <BidForm 
            onChange={onChange}
            onSubmit={onSubmit}
            value={enteredPrice}
          />
        }
      </div>
    );
  }
}

export default Auction;
