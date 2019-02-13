import React, { Component, Fragment } from 'react';
import './css/App.css';
import logo from "./logo.png";
import { Route, Switch } from 'react-router-dom';
import AuctionList from './containers/AuctionList';
import SignUp2 from './components/SignUp2';
import { connect } from 'react-redux';
import { logout } from './actions/login';
import CreateAuction from './components/CreateAuction';
import { Moment } from 'moment';
import SponsorForm from './components/SponsorForm';
import AdminPage from './components/AdminPage';

export interface AppProps {
  isLoggedIn: boolean;
  logout: () => any;
}

export type AuctionType = {
  name: string;
  description: string;
  startingPrice: number;
  startTime: Moment;
  endTime: Moment;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// export interface AppState {
//   auctions: {
//     [auctionName: string]: AuctionType & {
//       _id: string;
//       highestPrice: number;
//       enteredPrice: number;
//     }
//   };
//   signup: {
//     name: string;
//     email: string;
//     phone: string;
//   };
//   newAuction: Omit<AuctionType, 'startTime' | 'endTime'> & {
//     startTime: Moment | string;
//     endTime: Moment | string;
//   };
//   loggedIn: boolean;
// }

class App extends Component<AppProps> {

  render() {
    return (
      <div className="app">
        <div className="appLoad">
          <div className="appLoadIcon">
          </div>
          <div className="heart"></div>
        </div>
        <h1 className="appTitle">
          <div className="appTitleL">
            <img src={logo}/>
            Silent Auction
          </div>
          <div className="appTitleR">
            {
              this.props.isLoggedIn &&
              <a className="appSignOut" onClick={this.props.logout}>Sign Out</a>
            }
          </div>
        </h1>
        
        <Switch>
          <Route exact path="/admin" component={AdminPage} />
          <Route render={() => (
            <Fragment>
              {
                !this.props.isLoggedIn &&
                <SignUp2 />
              }
              <AuctionList />
            </Fragment>
          )} />
        </Switch>
        <div className="footer">
          Made with ❤️ by <a href="nhsurl">NHS</a> and <a href="wturl">Web Team</a>.
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: !!state.login.token
});

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
