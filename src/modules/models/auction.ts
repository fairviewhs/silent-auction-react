import { Document, Schema, Model, model} from "mongoose";
import { IBidModel } from "./bid";
import { ISponsorModel } from "./sponsor";
import { IUserModel } from "./user";

export interface IAuction {
  name: string;
  start_price: number;
  description: string;
  start_time: Date;
  end_time: Date;
}

export interface IAuctionModel extends Document, IAuction {
  bids: IBidModel[];
  users: IUserModel[];
  sponsors: ISponsorModel[];
}

const schema: Schema = new Schema({
  name: { required: true, type: String },
  start_price: { required: true, type: Number},
  description: { required: true, type: String },
  start_time: { required: true, type: Date },
  end_time: { required: true, type: Date },
  bids: [{ type: Schema.Types.ObjectId, ref: 'bid' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  sponsor: [{ type: Schema.Types.ObjectId, ref: 'sponsor' }]
});

export const Auction: Model<IAuctionModel> = model('auction', schema);