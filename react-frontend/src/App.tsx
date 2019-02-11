import React, { Component } from 'react';
import './css/App.css';
import Auction from "./components/Auction";
import AuctionForm, { AuctionItems } from "./components/AuctionForm";
import SignUp from "./components/SignUp";
import Results from "./components/Results";
import logo from "./logo.png";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'

export interface AppProps {
  apiRoot: string;
}

type AuctionType = {
  startingPrice: number;
  highestPrice: number;
  enteredPrice: number;
}

export interface AppState {
  auctions: {
    [auctionName: string]: AuctionType
  };
  signup: {
    name: string;
    email: string;
    phone: string;
  };
  newAuction: {
    name: string;
    image: string;
    startingPrice: number;
    description: string;
    startTime: Date;
    endTime: Date;
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
      image: '',
      startingPrice: 0,
      description: '',
      startTime: new Date(),
      endTime: new Date()
    },
    loggedIn: !!localStorage.getItem('token')
  }

  private getDataInterval: NodeJS.Timeout | null = null;

  getAuctionData = async () => {
    const res = await axios.get(`${this.props.apiRoot}/auction`);
    const updatedAuctions = (res.data as any[]).reduce((prevAuctions, auction) => {
      const {
        name,
        image,
        start_price: startingPrice,
        description,
        start_time: startTime,
        end_time: endTime
      } = auction;
      return {
        ...prevAuctions,
        [auction.name]: {
          enteredPrice: 0,
          highestPrice: startingPrice, // highestPrice and enteredPrice will be overwritten by following line (if they exist)
          ...this.state.auctions[auction.name],
          name,
          image,
          startingPrice,
          description,
          startTime: new Date(startTime),
          endTime: new Date(endTime)
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


  handleBidChange = (auctionName: string) => (bidPrice: number) => {
    this.setState({
      auctions: {
        [auctionName]: {
          ...this.state.auctions[auctionName],
          enteredPrice: bidPrice
        }
      }
    })
  }

  // TODO: post to backend
  placeBid = () => {}


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
      image,
      startingPrice,
      description,
      startTime,
      endTime
    } = this.state.newAuction;
    const { data } = await axios.post(`${this.props.apiRoot}/auction`, {
      name,
      image,
      start_price: startingPrice,
      description,
      start_time: new Date(startTime),
      end_time: new Date(endTime)
    });
    
    // TODO: post to backend

    // TODO: get auctions to update the list

    // TODO: clear newAuction of old details
  }


  render() {
    const auctions = Object.entries(this.state.auctions).map(([auctionName, auction]) => (
      <Auction
        key={auctionName}
        startingPrice={auction.startingPrice}
        highestPrice={auction.highestPrice}
        enteredPrice={auction.enteredPrice}
        onChange={this.handleBidChange(auctionName)}
        onSubmit={this.placeBid}
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
        <Results/>
        {/* TODO: if authenicated as admin */}
        <AuctionForm
          name={this.state.newAuction.name}
          image={this.state.newAuction.image}
          startingPrice={this.state.newAuction.startingPrice}
          description={this.state.newAuction.description}
          startTime={this.state.newAuction.startTime}
          endTime={this.state.newAuction.endTime}
          onChange={this.handleNewAuctionChange}
          onSubmit={this.addAuction}
        />
        <div className="footer">
          Made with ❤️ by <a href="nhsurl">NHS</a> and <a href="wturl">Web Team</a>.
        </div>
      </div>
    );
  }
}

export default App;
