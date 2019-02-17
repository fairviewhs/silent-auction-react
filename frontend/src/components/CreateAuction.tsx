import React, { Component, FormEvent, ChangeEvent } from 'react';
import { addAuction } from '../actions/auction';
import '../css/ACP.css';
import Datetime from 'react-datetime';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';

export type AuctionItems = 'name' | 'startingPrice' | 'description' | 'startTime' | 'endTime';

export interface CreateAuctionProps {
  addAuction: (auction: any) => any;
}

class CreateAuction extends Component<CreateAuctionProps, any> {

  state = {
    name: '',
    startingPrice: '',
    description: '',
    startTime: moment(),
    endTime: moment()
  }

  changeValue = (property: AuctionItems, value: any) =>
    this.setState({
      ...this.state,
      [property]: value
    });

  handleChange = (property: AuctionItems) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    let value: any = event.target.value;
    if (property === 'startingPrice') {
      value = parseFloat(value);
    }
    this.state
    this.changeValue(property, value);
  }
  handleDateChange = (property: 'startTime' | 'endTime') => (date: string | Moment) => {
    this.changeValue(property, date);
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.addAuction({
      ...this.state,
      startTime: this.state.startTime.toDate(),
      endTime: this.state.endTime.toDate()
    })
  }
  public render() {
    const { name, startingPrice, description, startTime, endTime } = this.state;
    return (
      <form className="ACPAuctionForm" onSubmit={this.handleSubmit}>
        <label>Name:</label>
        <input type="text" placeholder="Bundle Name" value={name} onChange={this.handleChange('name')} required/>
        <label>Start Price:</label>
        <input type="number" placeholder="Starting Price" value={startingPrice} onChange={this.handleChange('startingPrice')} required/>
        <label>Description:</label>
        <textarea placeholder="Bundle Description" value={description} onChange={this.handleChange('description')} required/>
        <label>Start Time:</label>
        <Datetime value={startTime} onChange={this.handleDateChange('startTime')} />
        <label>End Time:</label>
        <Datetime value={endTime} onChange={this.handleDateChange('endTime')} />
        <input type="submit" value="Submit" required/>
      </form>
    );
  }
}

const mapDispatchToProps = {
  addAuction
}

export default connect(null, mapDispatchToProps)(CreateAuction);