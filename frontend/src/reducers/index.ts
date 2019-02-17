import { combineReducers } from "redux";
import auctions from './auction';
import login from './login';
import admin from './admin';

const auctionApp = combineReducers({
  auctions,
  login,
  admin
});

export default auctionApp;