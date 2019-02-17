import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../css/ACP.css';
import { connect } from 'react-redux';
import { addSponsor } from '../actions/sponsor';

export type SponsorItems = 'name' | 'image' | 'auction';

interface SponsorFormProps {
    // name: string;
    // image: string;
    auctions: {_id: string, name: string}[];
    addSponsor: (sponsor: any) => any;
    // onChange: (property: SponsorItems, value: any) => any;
    // onSubmit: () => any;
}

class SponsorForm extends Component<SponsorFormProps> {
  state = {
    name: '',
    image: '',
    auctionId: ''
  }
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // console.log(this.state)
    this.props.addSponsor({
      name: this.state.name,
      image: this.state.image,
      auctionIds: [this.state.auctionId]
    });
    // this.props.onSubmit();
  }
  handleChange = (property: string) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => 
    this.setState({
      [property]: event.target.value
    });
  
  render() {
    const { name, image, auctionId } = this.state;
    const { auctions } = this.props;
    return (
      <form className="ACPSponsorForm" onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input type="text" placeholder="Sponsor Name" value={name} required onChange={this.handleChange('name')}/>
        <label>Image:</label>
        <input type="text" placeholder="Image URL" required value={image} onChange={this.handleChange('image')}/>
        <label>Auction:</label>
        <select value={auctionId} onChange={this.handleChange('auctionId')}>
            {
                auctions.map(auction => (
                    <option key={auction._id} value={auction._id}>{auction.name}</option>
                ))
            }
            {/* <option value="none" selected={true}>Select Auction</option> */}
        </select>
        <input type="submit" value="Submit" required/>
      </form>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auctions: state.auctions.auctions.map((auction: any) => ({
    name: auction.name,
    _id: auction._id
  }))
});

const mapDispatchToProps = {
  addSponsor
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorForm);
