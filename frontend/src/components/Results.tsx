import React, { Component } from 'react';
import '../css/Results.css';

class Results extends Component {
  render() {
    return (
      <div className="results">
        <div className="resultsHeader">
            <div className="resultsBundle">Bundle</div>
            <div className="resultsBid">Highest Bid</div>
            <div className="resultsName">Name</div>
            <div className="resultsEmail">Email</div>
            <div className="resultsPhone">Phone</div>
        </div>
        <div className="resultsRow">
            <div className="resultsBundle">Bundle Name</div>
            <div className="resultsBid">Highest Bid</div>
            <div className="resultsName">Bidder Name</div>
            <div className="resultsEmail">Bidder Name</div>
            <div className="resultsPhone">Bidder Name</div>
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

export default Results;
