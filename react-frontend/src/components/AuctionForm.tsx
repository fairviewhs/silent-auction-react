import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../css/ACP.css';

export type AuctionItems = 'name' | 'image' | 'startingPrice' | 'description' | 'startTime' | 'endTime';

export interface AuctionFormProps {
  name: string;
  image: string;
  startingPrice: number;
  description: string;
  startTime: Date;
  endTime: Date;
  onChange: (property: AuctionItems, value: any) => any;
  onSubmit: () => any;
}

class AuctionForm extends Component<AuctionFormProps> {
  handleChange = (property: AuctionItems) => (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    let value: any = event.target.value;
    if (property === 'startTime' || property === 'endTime') {
      value = (event as ChangeEvent<HTMLInputElement>).target.valueAsDate;
    } else if (property === 'startingPrice') {
      value = parseFloat(value);
    }
    this.props.onChange(property, value);
  }
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmit();
  }
  render() {
    const { name, image, startingPrice, description, startTime, endTime } = this.props;
    return (
      <form className="ACPAuctionForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Bundle Name" value={name} onChange={this.handleChange('name')} required/>
        <input type="text" placeholder="Image Url" value={image} onChange={this.handleChange('image')} required/>
        <input type="number" placeholder="Starting Price" value={startingPrice} onChange={this.handleChange('startingPrice')} required/>
        <textarea placeholder="Bundle Description" value={description} onChange={this.handleChange('description')} required/>
        <input type="date" placeholder="Start Time" value={startTime.toISOString().substr(0, 10)} onChange={this.handleChange('startTime')} required/> {/* See https://stackoverflow.com/questions/12346381/set-date-in-input-type-date */}
        <input type="date" placeholder="End Time" value={endTime.toISOString().substr(0, 10)} onChange={this.handleChange('endTime')} required/>
        <input type="submit" value="Submit" required/>
      </form>
    );
  }
}

export default AuctionForm;
