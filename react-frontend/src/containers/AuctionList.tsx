import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuctions } from '../actions/auction';
import Auction from '../components/Auction';
import { addBid } from '../actions/bid';
// import { bindActionCreators } from 'redux';

// export type Auction = {
//   name: string;
//   description: string;
//   startingPrice: number;
//   startTime: Moment;
//   endTime: Moment;
//   highestPrice: number;
//   enteredPrice: number;
// }

export interface AuctionListProps {
  auctions: any[];
  addBid: (bid: any) => any;
  fetchAuctions: () => any;
  isLoggedIn: boolean;
  // addAuction: (auction: Auction) => any;
}

export type AuctionListState = {
  bidPrices: {
    [auctionId: string]: number
  }
}

class AuctionList extends Component<AuctionListProps, AuctionListState> {

  state: AuctionListState = {
    bidPrices: {}
  }

  private getAuctionInterval: NodeJS.Timeout | null = null;

  getAuction = () => this.props.fetchAuctions();

  componentDidMount() {
    this.getAuction()//.then(() => console.log('done'));
    this.getAuctionInterval = setInterval(this.getAuction, 5000);
  }

  componentWillUnmount() {
    if (!!this.getAuctionInterval) {
      clearInterval(this.getAuctionInterval);
    }
  }

  changeBidPrice = (auctionId: string) => (bidPrice: number) =>
    this.setState({
      bidPrices: {
        ...this.state.bidPrices,
        [auctionId]: bidPrice
      }
    });
  
  createBid = (auctionId: string) => () => {
    if (this.state.bidPrices[auctionId] === undefined) {
      throw new Error(`Unable to find bid amount for auction id: ${auctionId}`);
    }
    this.props.addBid({
      auctionId,
      bidPrice: this.state.bidPrices[auctionId]
    })
  }
  

  public render() {
    const auctions = this.props.auctions.map((auction) => {
      const bidPrice = !this.state.bidPrices[auction._id] ? 0 : this.state.bidPrices[auction._id];
      return (
        <Auction
          key={(auction as any)._id}
          {...auction}
          enteredPrice={bidPrice}
          onChange={this.changeBidPrice(auction._id)}
          onSubmit={this.createBid(auction._id)}
          canBid={this.props.isLoggedIn}
          // onChange={this.handleBidChange(auctionName)}
          // onSubmit={this.placeBid(auctionName)}
          // canBid={this.state.loggedIn}
        />
      );
    });
    return auctions;
  }
}

const mapStateToProps = (state: any) => ({
  auctions: state.auctions.auctions,
  isLoggedIn: !!state.login.token
});

const mapDispatchToProps = {
  fetchAuctions,
  addBid
}

// const mapDispatchToProps = (dispatch: any) => 
//   bindActionCreators({
//     fetchAuctions
//   }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuctionList);