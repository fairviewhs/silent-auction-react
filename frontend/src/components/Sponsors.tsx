import React, { Component } from 'react';
import '../css/Auction.css';

export interface SponsorsProps {
  sponsors: {_id: string, name: string, image: string}[];
}

class Sponsors extends Component<SponsorsProps> {

  render() {
    console.log(this.props.sponsors)
    return (
      <div className="sponsors">
        {
          this.props.sponsors.map(sponsor => (
            <img key={sponsor._id} src={sponsor.image} alt={sponsor.name} className="sponsor"/>
          ))
        }
      </div>
    );
  }
}

export default Sponsors;
