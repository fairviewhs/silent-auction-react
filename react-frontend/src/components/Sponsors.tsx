import React, { Component } from 'react';
import '../css/Auction.css';
import BidForm from './BidForm';
import { SponsorType } from '../App';

export interface SponsorsProps extends SponsorsType {
  highestPrice: number;
  enteredPrice: number;
  canBid: boolean;
  onChange: (bidPrice: number) => any;
  onSubmit: () => any;
}

class Sponsors extends Component<SponsorsProps> {

  render() {
    const { name, image } = this.props;
    return (
      <img src={image} alt={name}/>
    );
  }
}

export default Sponsors;
