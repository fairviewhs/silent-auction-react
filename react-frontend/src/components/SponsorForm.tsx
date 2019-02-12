import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../css/ACP.css';

export type SponsorItems = 'name' | 'image' | 'auction';

interface SponsorFormProps {
    name: string;
    url: string;
    auctions: {_id: string, name: string}[];
    onChange: (property: SponsorItems, value: any) => any;
    onSubmit: () => any;
}

class SponsorForm extends Component<SponsorFormProps> {
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmit();
  }
  render() {
    const { name, url, auctions } = this.props;
    return (
      <form className="ACPSponsorForm" onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input type="text" placeholder="Sponsor Name" value={name} required/>
        <label>Image:</label>
        <input type="text" placeholder="Image URL" required/>
        <select>
            {
                auctions.map(auction => (
                    <option key={auction._id} value={auction._id}>{auction.name}</option>
                ))
            }
            <option value="none" selected={true}>Select Auction</option>
        </select>
        <input type="submit" value="Submit" required/>
      </form>
    );
  }
}

export default SponsorForm;
