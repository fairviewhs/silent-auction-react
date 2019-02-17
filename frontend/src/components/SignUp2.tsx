import React, { Component, ChangeEvent, FormEvent } from 'react';
import '../css/SignUp.css';
import { connect } from 'react-redux';
import { login } from '../actions/login';

export type UserRegister = 'name' | 'email' | 'phone';

export interface SignUpProps {
  login: (name: string, email: string, phone: string) => any;
}

class SignUp extends Component<SignUpProps> {

  state = {
    name: '',
    email: '',
    phone: ''
  }

  handleChange = (property: UserRegister) => (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [property]: event.target.value
    })
  } 

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { name, email, phone } = this.state;
    this.props.login(name, email, phone);
  }

  render() {
    const { name, email, phone } = this.state;
    return (
      <div className="signUp">
        <div className="signUpInfo">
          <h2>Our Cause</h2>
          <p>
            This year, Fairview National Honor Society is hosting a silent auction on February 13th and 14th at Fairview High School’s Parent Teacher Conferences to support There With Care, a Boulder-based non-profit which provides resources and care for families of children with a critical illness. 
          </p>
          <a className="supporting" href="https://therewithcare.org/">
            <img src="https://therewithcare.org/wp-content/uploads/2017/01/TWC-logo-retina.png"/>
          </a>
          <h2>Get Involved</h2>
          <p>
            Give us your contact info to start bidding anonymously. We will use the details you provide us to contact you if you win an auction!
          </p>
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
              placeholder="xxxxxxxxxx (Numbers only)" 
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

const mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(SignUp);
