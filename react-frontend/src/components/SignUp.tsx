import React, { Component } from 'react';
import '../css/SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <div className="signUp">
        <div className="signUpInfo">
            Sign up to participate in the auctions. We will contact you if you win an item.
        </div>
        <form className="signUpForm">
            <h2>Join the Auction!</h2>
            <label>Name:</label>
            <input type="text" placeholder="First Last"/>
            <label>Email:</label>
            <input type="email" placeholder="name@email.com"/>
            <label>Phone Number:</label>
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx"/>
            <input type="submit" value="Start Bidding"/>
        </form>
      </div>
    );
  }
}

export default SignUp;
