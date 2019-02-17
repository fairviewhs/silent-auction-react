import { Document, Schema, Model, model} from "mongoose";
import { IUserModel } from "./user";
import { IAuctionModel } from "./auction";

export interface IBid {
  amount: number;
}

export interface IBidModel extends Document, IBid {
  user: IUserModel;
  auction: IAuctionModel;
}

const schema: Schema = new Schema({
  amount: { required: true, type: Number },
  user: { required: true, type: Schema.Types.ObjectId, ref: 'user' },
  auction: { required: true, type: Schema.Types.ObjectId, ref: 'auction' }
});

export const Bid: Model<IBidModel> = model('bid', schema);