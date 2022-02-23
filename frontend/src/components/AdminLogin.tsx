import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { loginAdmin } from '../actions/admin';
import '../css/ACP.css';

export interface AdminLoginProps {
  login: (email: string, password: string) => any;
}

class AdminLogin extends Component<AdminLoginProps, any> {
  state = {
    email: '',
    password: ''
  }
  handleChange = (property: string) => (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [property]: event.target.value
    })
  }
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
  public render() {
    const { email, password } = this.state;
    return (
      <form className="signUpForm" onSubmit={this.handleSubmit}>
        <label>Email:</label>
        <input type="email" placeholder="Email" value={email} onChange={this.handleChange('email')} required/>
        <label>Password:</label>
        <input type="password" placeholder="Password" value={password} onChange={this.handleChange('password')} required/>
        <input type="submit" value="Submit" required/>
      </form>
    );
  }
}

const mapStateToProps = (state: any) => ({
  
});

const mapDispatchToProps = {
  login: loginAdmin
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);