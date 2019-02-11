import { Document, Schema, Model, model} from "mongoose";

export interface IAuction {
  name: string;
  image: string;
  start_price: number;
  description: string;
  start_time: Date;
  end_time: Date;
}

export interface IAuctionModel extends Document, IAuction {
  isAdmin(): boolean;
}

const schema: Schema = new Schema({
  name: { required: true, type: String },
  image: { required: true, type: String},
  start_price: { required: true, type: Number},
  description: { required: true, type: String },
  start_time: { required: true, type: Date },
  end_time: { required: true, type: Date },
  bids: [{ type: Schema.Types.ObjectId, ref: 'bid' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

schema.methods.isAdmin = () => false;

export const Auction: Model<IAuctionModel> = model('auction', schema);