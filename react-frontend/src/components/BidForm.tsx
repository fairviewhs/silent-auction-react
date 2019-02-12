import React, { Component, FormEvent, ChangeEvent } from 'react';
import '../css/Auction.css';

export interface BidProps {
  value: number;
  onChange: (bidPrice: number) => any;
  onSubmit: () => any;
}

export default class BidForm extends Component<BidProps> {
  state = {
    error: false
  }
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price: number = parseFloat(event.target.value);
    this.props.onChange(price);
    if (isNaN(price)) {
      this.setState({ error: 'Bid is not a number.' });
    } else {
      this.setState({ error: false });
    }
  }
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('is error')
    console.log(this.state.error);
    if (!this.state.error) {
      this.props.onSubmit();
    }
  }
  render() {
    const { value } = this.props;
    return (
      <form className="auctionForm" onSubmit={this.handleSubmit}>
        <input type="number" value={value} onChange={this.handleChange} placeholder="Make a bid"/>
        <input type="submit" value="Bid" />
      </form>
    );
  }
}