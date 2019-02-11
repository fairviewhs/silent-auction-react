import React, { Component, Fragment } from 'react';
import './css/App.css';
import Auction from "./components/Auction";
import AuctionForm, { AuctionItems } from "./components/AuctionForm";
import SignUp from "./components/SignUp";
import Results from "./components/Results";
import logo from "./logo.png";
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { Moment } from 'moment';
import { async } from 'q';

export interface AppProps {
  apiRoot: string;
}

export type AuctionType = {
  name: string;
  description: string;
  startingPrice: number;
  startTime: Moment;
  endTime: Moment;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface AppState {
  auctions: {
    [auctionName: string]: AuctionType & {
      _id: string;
      highestPrice: number;
      enteredPrice: number;
    }
  };
  signup: {
    name: string;
    email: string;
    phone: string;
  };
  newAuction: Omit<AuctionType, 'startTime' | 'endTime'> & {
    startTime: Moment | string;
    endTime: Moment | string;
  };
  loggedIn: boolean;
}

class App extends Component<AppProps, AppState> {

  state: AppState = {
    auctions: {},
    signup: {
      name: '',
      email: '',
      phone: ''
    },
    newAuction: {
      name: '',
      startingPrice: 0,
      description: '',
      startTime: '',
      endTime: ''
    },
    loggedIn: !!localStorage.getItem('token')
  }

  private getDataInterval: NodeJS.Timeout | null = null;

  getAuctionData = async () => {
    const res = await axios.get(`${this.props.apiRoot}/auction`);
    const updatedAuctions = (res.data as any[]).reduce((prevAuctions, auction) => {
      const {
        _id,
        name,
        start_price: startingPrice,
        description,
        start_time: startTime,
        end_time: endTime,
        highestPrice
      } = auction;
      return {
        ...prevAuctions,
        [auction.name]: {
          _id,
          enteredPrice: startingPrice + 1,
          ...this.state.auctions[auction.name],
          highestPrice,
          name,
          startingPrice,
          description,
          startTime: '',
          endTime: ''
        }
      }
    }, {});
    console.log(updatedAuctions)
    this.setState({
      auctions: updatedAuctions
    })
  }

  componentDidMount() {
    this.getAuctionData();
    this.getDataInterval = setInterval(this.getAuctionData, 5000);
  }

  componentWillUnmount() {
    if (!!this.getDataInterval) {
      clearInterval(this.getDataInterval);
    }
  }

  handleAuctionPropertyChange = (auctionName: string, properties: any) =>
    this.setState({
      auctions: {
        ...this.state.auctions,
        [auctionName]: {
          ...this.state.auctions[auctionName],
          ...properties
        }
      }
    })

  handleBidChange = (auctionName: string) => (bidPrice: number) => 
    this.handleAuctionPropertyChange(auctionName, { enteredPrice: bidPrice });

  // TODO: post to backend
  placeBid = (auctionName: string) => async () => {
    const currentAuction = this.state.auctions[auctionName];
    console.log('POSTING')
    console.log(`${this.props.apiRoot}/bid`, 
    { auctionId: currentAuction._id, bidPrice: currentAuction.enteredPrice },
    { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
  )
    const { data } = await axios.post(`${this.props.apiRoot}/bid`, 
      { auctionId: currentAuction._id, bidPrice: currentAuction.enteredPrice },
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    );

    if (data.success) {
      this.handleAuctionPropertyChange(auctionName, { highestPrice: currentAuction.enteredPrice })
    }
  }


  handleSignupChange = (property: 'name' | 'email' | 'phone', value: string) => {
    this.setState({
      signup: {
        ...this.state.signup,
        [property]: value
      }
    });
  }
  register = async () => {
    const { data } = await axios.post(`${this.props.apiRoot}/auth/create`, this.state.signup);
    localStorage.setItem('token', data.access_token);
    this.setState({ loggedIn: true });
  }
  logout = () => {
    this.setState({ loggedIn: false });
    localStorage.removeItem('token');
  };

  handleNewAuctionChange = (property: AuctionItems, value: any) => {
    this.setState({
      newAuction: {
        ...this.state.newAuction,
        [property]: value
      }
    });
  }

  // TODO: post to backend
  addAuction = async () => {
    const {
      name,
      startingPrice,
      description,
      startTime,
      endTime
    } = this.state.newAuction;

    if (typeof startTime === 'string' || typeof endTime === 'string') {
      return;
    }

    const { data } = await axios.post(`${this.props.apiRoot}/auction`, {
      name,
      start_price: startingPrice,
      description,
      start_time: startTime.toDate(),
      end_time: endTime.toDate()
    });

    // TODO: get auctions to update the list

    // TODO: clear newAuction of old details
  }


  render() {
    const auctions = Object.entries(this.state.auctions).map(([auctionName, auction]) => (
      <Auction
        key={auctionName}
        {...auction}
        onChange={this.handleBidChange(auctionName)}
        onSubmit={this.placeBid(auctionName)}
        canBid={this.state.loggedIn}
      />
    ));
    return (
      <div className="app">
        <h1 className="appTitle">
          <div className="appTitleL">
            <img src={logo}/>
            Silent Auction
          </div>
          <div className="appTitleR">
            {
              this.state.loggedIn &&
              <a className="appSignOut" onClick={this.logout}>Sign Out</a>
            }
          </div>
        </h1>
        
        <Switch>
          <Route exact path="/admin" render={() => (
            <Fragment>
              <Results/>
              {/* TODO: if authenicated as admin */}
              <AuctionForm
                name={this.state.newAuction.name}
                startingPrice={this.state.newAuction.startingPrice}
                description={this.state.newAuction.description}
                startTime={this.state.newAuction.startTime}
                endTime={this.state.newAuction.endTime}
                onChange={this.handleNewAuctionChange}
                onSubmit={this.addAuction}
              />
            </Fragment>
          )} />

          <Route render={() => (
            <Fragment>
              {
                !this.state.loggedIn &&
                <SignUp
                  name={this.state.signup.name}
                  email={this.state.signup.email}
                  phone={this.state.signup.phone}
                  onChange={this.handleSignupChange}
                  onSubmit={this.register}
                />
              }
              {auctions}
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

export default App;
