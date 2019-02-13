import React, { Component } from 'react';
import '../css/App.css';

export interface FlashProps {
  message: string;
}

class Flash extends Component<FlashProps> {

  render() {
    const {
      message
    } = this.props;
    return (
      <div className="flashError">
      </div>
    );
  }
}

export default Flash;
