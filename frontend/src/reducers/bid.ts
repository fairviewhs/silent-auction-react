import * as BidActionTypes from '../actiontypes/bid';

// TODO: better types
function bids(
  state = {
    bids: []
  },
  action: any
) {
  switch (action.type) {
    case BidActionTypes.RECEIVE_BIDS_SUCCESS:
      return {
        ...state,
        bids: action.response
      }
    case BidActionTypes.ADD_BID:
      return {
        ...state,
        bids: [
          ...state.bids,
          {
            ...action.bid,
            _id: action.tempId
          }
        ]
      }
    case BidActionTypes.ADD_BID_SUCCESS:
      return {
        ...state,
        bids: state.bids.map((bid: any) => {
          if (bid._id === action.tempId) {
            return {
              ...bid,
              _id: action.response._id
            }
          }
          return bid;
        })
      }
    case BidActionTypes.ADD_BID_FAILURE:
      return {
        ...state,
        bids: state.bids.filter((bid: any) => bid._id !== action.tempId)
      }
    default:
      return state;
  }
}

export default bids;