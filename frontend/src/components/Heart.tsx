import React, { Component } from 'react';

export interface HeartProps {
}

export default class Heart extends Component<HeartProps, any> {
  public render() {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000 }} >
        <div className="appLoad">
          <div className="appLoadIcon">
          </div>
          <div className="heart"></div>
        </div>
      </div>
    );
  }
}