import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../css/ACP.css';
import Datetime from 'react-datetime';
import { Moment } from 'moment';
import { AuctionType, Omit } from '../App';

export type AuctionItems = 'name' | 'startingPrice' | 'description' | 'startTime' | 'endTime';


export type AuctionFormProps = Omit<AuctionType, 'startTime' | 'endTime'> & {
  startTime: string | Moment;
  endTime: string | Moment;
  onChange: (property: AuctionItems, value: any) => any;
  onSubmit: () => any;
}

class AuctionForm extends Component<AuctionFormProps> {
  handleChange = (property: AuctionItems) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    let value: any = event.target.value;
    if (property === 'startingPrice') {
      value = parseFloat(value);
    }
    this.props.onChange(property, value);
  }
  handleDateChange = (property: 'startTime' | 'endTime') => (date: string | Moment) => {
    this.props.onChange(property, date);
  }
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmit();
  }
  render() {
    const { name, image, startingPrice, description, startTime, endTime } = this.props;
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

export default AuctionForm;
