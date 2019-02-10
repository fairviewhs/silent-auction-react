import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../css/SignUp.css';

export type UserRegister = 'name' | 'email' | 'phone';

export interface SignUpProps {
  onSubmit: () => any;
  onChange: (property: UserRegister, value: string) => any;
  name: string;
  email: string;
  phone: string;
}

class SignUp extends Component<SignUpProps> {
  handleChange = (property: UserRegister) => (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(property, event.target.value);
  } 

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("LOGIN")
    this.props.onSubmit();
  }

  render() {
    const { name, email, phone } = this.props;
    return (
      <div className="signUp">
        <div className="signUpInfo">
            Sign up to participate in the auctions. We will contact you if you win an item.
        </div>
        <form className="signUpForm" onSubmit={this.handleSubmit}>
            <h2>Join the Auction!</h2>
            <label>Name:</label>
            <input 
              type="text" 
              placeholder="First Last" 
              value={name}
              onChange={this.handleChange('name')} 
              required
            />
            <label>Email:</label>
            <input 
              type="email" 
              placeholder="name@email.com" 
              value={email} 
              onChange={this.handleChange('email')}
              required
            />
            <label>Phone Number:</label>
            <input 
              type="tel" 
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}" 
              placeholder="xxx-xxx-xxxx" 
              value={phone} 
              onChange={this.handleChange('phone')}
              required
            />
            <input type="submit" value="Start Bidding"/>
        </form>
      </div>
    );
  }
}

export default SignUp;
