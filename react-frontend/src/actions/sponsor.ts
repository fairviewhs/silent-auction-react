import * as SponsorActionTypes from '../actiontypes/sponsor';
import { CALL_API } from '../redux-middleware/api/api';

export const addSponsor = (sponsor: any) => ({
  sponsor,
  [CALL_API] : {
    types: [
      SponsorActionTypes.ADD_SPONSOR,
      SponsorActionTypes.ADD_SPONSOR_SUCCESS,
      SponsorActionTypes.ADD_SPONSOR_FAILURE
    ],
    method: 'POST',
    endpoint: '/sponsor',
    data: sponsor
    // mapResponse: (response: any[]) => response.map((apiAuction) => ({
    //   name: apiAuction.name,
    //   description: apiAuction.description,
    //   startTime: apiAuction.start_time,
    //   endTime: apiAuction.end_time,
    //   highestPrice: apiAuction.highestPrice,
    //   startingPrice: apiAuction.start_price,
    //   sponsors: apiAuction.sponsors,
    //   _id: apiAuction._id
    // }))
  }
})