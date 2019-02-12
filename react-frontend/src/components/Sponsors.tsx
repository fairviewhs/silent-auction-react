import React, { Component } from 'react';

export interface SponsorsProps {
  sponsors: {_id: string, name: string, image: string}[];
}

class Sponsors extends Component<SponsorsProps> {

  render() {
    return (
      <div className="sponsors">
        {
          this.props.sponsors.map(sponsor => { 
            <img src={sponsor.image} alt={sponsor.name} className="sponsor"/>
          })
        }
      </div>
    );
  }
}

export default Sponsors;
