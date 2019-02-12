import * as AuctionActionTypes from '../actiontypes/auction';

// TODO: better types
function auctions(
  state = {
    auctions: []
  },
  action: any
) {
  switch (action.type) {
    case AuctionActionTypes.RECEIVE_AUCTIONS_SUCCESS:
      return {
        ...state,
        auctions: action.response
      }
    case AuctionActionTypes.ADD_AUCTION:
      return {
        ...state,
        auctions: [
          ...state.auctions,
          {
            ...action.auction,
            _id: action.tempId
          }
        ]
      }
    case AuctionActionTypes.ADD_AUCTION_SUCCESS:
      return {
        ...state,
        auctions: state.auctions.map((auction: any) => {
          if (auction._id === action.tempId) {
            return {
              ...auction,
              _id: action.response._id
            }
          }
          return auction;
        })
      }
    case AuctionActionTypes.ADD_AUCTION_FAILURE:
      return {
        ...state,
        auctions: state.auctions.filter((auction: any) => auction._id !== action.tempId)
      }
    default:
      return state;
  }
}

export default auctions;