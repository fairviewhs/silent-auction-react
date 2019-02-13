import * as AuctionActionTypes from '../actiontypes/auction';
import uuid from 'uuid/v4';
import api, { CALL_API } from '../redux-middleware/api/api';

export const fetchAuctions = () => ({
  [CALL_API] : {
    types: [
      AuctionActionTypes.REQUEST_AUCTIONS,
      AuctionActionTypes.RECEIVE_AUCTIONS_SUCCESS,
      AuctionActionTypes.REQUEST_AUCTIONS_FAILURE
    ],
    method: 'GET',
    endpoint: '/auction',
    mapResponse: (response: any[]) => response.map((apiAuction) => ({
      name: apiAuction.name,
      description: apiAuction.description,
      startTime: apiAuction.start_time,
      endTime: apiAuction.end_time,
      highestPrice: apiAuction.highestPrice,
      startingPrice: apiAuction.start_price,
      sponsors: apiAuction.sponsors,
      _id: apiAuction._id
    }))
  }
});

export const addAuction = (auction: any) => ({
  [CALL_API] : {
    types: [
      AuctionActionTypes.ADD_AUCTION,
      AuctionActionTypes.ADD_AUCTION_SUCCESS,
      AuctionActionTypes.ADD_AUCTION_FAILURE
    ],
    method: 'POST',
    endpoint: '/auction',
    data: {
      name: auction.name,
      start_price: auction.startingPrice,
      description: auction.description,
      start_time: auction.startTime,
      end_time: auction.endTime
    }
  },
  tempId: uuid(),
  auction
})