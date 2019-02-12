import { combineReducers } from "redux";
import auctions from './auction';
import login from './login';

const auctionApp = combineReducers({
  auctions,
  login
});

export default auctionApp;