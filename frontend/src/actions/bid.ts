import * as BidActionTypes from '../actiontypes/bid';
import uuid from 'uuid/v4';
import api, { CALL_API } from '../redux-middleware/api/api';

export const fetchBids = () => ({
  [CALL_API] : {
    types: [
      BidActionTypes.REQUEST_BIDS,
      BidActionTypes.RECEIVE_BIDS_SUCCESS,
      BidActionTypes.REQUEST_BIDS_FAILURE
    ],
    method: 'GET',
    endpoint: '/bid',
    // mapResponse: (response: any[]) => response.map((apiBid) => ({
    //   name: apiBid.name,
    //   description: apiBid.description,
    //   startTime: apiBid.start_time,
    //   endTime: apiBid.end_time,
    //   highestPrice: apiBid.highestPrice,
    //   startingPrice: apiBid.start_price,
    //   _id: apiBid._id
    // }))
  }
});

export const addBid = (bid: any) => ({
  [CALL_API] : {
    types: [
      BidActionTypes.ADD_BID,
      BidActionTypes.ADD_BID_SUCCESS,
      BidActionTypes.ADD_BID_FAILURE
    ],
    method: 'POST',
    endpoint: '/bid',
    data: bid
  },
  tempId: uuid(),
  bid
})