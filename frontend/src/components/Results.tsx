import React, { Component } from 'react';
import '../css/Results.css';
import { connect } from 'react-redux';

export type ResultsProps = {
  results: {
    name: string;
    highestPrice: string;
    person: {
      name: string;
      email: string;
      phone: string;
    }
  }[]
};

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;
    const list = results.map(result => (
      <div className="resultsRow" key={result.name}>
        <div className="resultsBundle">{result.name}</div>
        <div className="resultsBid">{result.highestPrice}</div>
        <div className="resultsName">{result.person.name}</div>
        <div className="resultsEmail">{result.person.email}</div>
        <div className="resultsPhone">{result.person.phone}</div>
      </div>
    ))
    return (
      <div className="results">
        <div className="resultsHeader">
          <div className="resultsBundle">Bundle</div>
          <div className="resultsBid">Highest Bid</div>
          <div className="resultsName">Name</div>
          <div className="resultsEmail">Email</div>
          <div className="resultsPhone">Phone</div>
        </div>
        {list}
      </div>
        <div className="resultsRow">
            <div className="resultsBundle">Bundle Name</div>
            <div className="resultsBid">Highest Bid</div>
            <div className="resultsName">Bidder Name</div>
            <div className="resultsEmail">Bidder Name</div>
            <div className="resultsPhone">Bidder Name</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  results: state.auctions.auctions
    .filter((auction: any) => !!auction.highestBidder)
    .map((auction: any) => {
    return {
      name: auction.name,
      highestPrice: auction.highestPrice,
      person: {
        name: auction.highestBidder.name,
        email: auction.highestBidder.email,
        phone: auction.highestBidder.phone
      }
    }
  })
})

export default connect(mapStateToProps)(Results);
