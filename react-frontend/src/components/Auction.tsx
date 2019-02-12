import React, { Component } from 'react';
import '../css/Auction.css';
import BidForm from './BidForm';
import Sponsors from './Sponsors';
import { AuctionType } from '../App';

export interface AuctionProps extends AuctionType {
  highestPrice: number;
  enteredPrice: number;
  canBid: boolean;
  sponsors: {_id: string, name: string, image: string}[];
  onChange: (bidPrice: number) => any;
  onSubmit: () => any;
}

class Auction extends Component<AuctionProps> {

  formatMoney = (money: number) => {
    return `$${money.toFixed(2)}`;
  }

  render() {
    const {
      name, 
      description, 
      startTime, 
      endTime, 
      startingPrice, 
      highestPrice,
      sponsors, 
      enteredPrice, 
      canBid, 
      onChange, 
      onSubmit 
    } = this.props;
    return (
      <div className="auction">
        <div className="auctionL">
          <h2 className="auctionName">{name}</h2>
          {/* TODO: SPONSORS */}
          <p className="auctionDesc">
            {description}
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
        <div className="auctionR">
          <Sponsors sponsors={sponsors}/>
        </div>
      </div>
    );
  }
}

export default Auction;
